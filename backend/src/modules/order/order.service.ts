import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { randomInt, randomUUID } from 'node:crypto';
import { Prisma } from '../../generated/prisma/client.js';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {}

  async findMyOrders(userId: string) {
    return await this.databaseService.order.findMany({
      where: {
        personId: userId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createOrder(userId: string, createOrderDto: CreateOrderDto) {
    const [passenger, hotel] = await Promise.all([
      this.databaseService.passenger.findUnique({
        where: {
          id: createOrderDto.passengerId,
          personId: userId,
        },
      }),

      this.databaseService.hotel.findUnique({
        where: {
          id: createOrderDto.hotelId,
        },
        include: {
          rooms: {
            where: {
              id: createOrderDto.roomId,
            },
          },
        },
      }),
    ]);

    if (!passenger) {
      throw new NotFoundException('Passenger not found!');
    }

    if (!hotel) {
      throw new NotFoundException('Hotel not found!');
    }

    const room = hotel.rooms[0];

    if (!room) {
      throw new NotFoundException('Room not found!');
    }

    //Checking room is reserved or not
    if (room.isReserved) {
      throw new BadRequestException('Room is reserved!');
    }

    // Checking Date validations
    const checkIn = new Date(createOrderDto.checkIn);
    const checkOut = new Date(createOrderDto.checkOut);

    if (
      Number.isNaN(checkIn.getTime()) ||
      Number.isNaN(checkOut.getTime()) ||
      checkIn >= checkOut
    ) {
      throw new BadRequestException('Invalid reservation dates!');
    }

    if (checkIn < new Date(new Date().toDateString())) {
      throw new BadRequestException('Check-in date cannot be in the past!');
    }

    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );

    const pricePerNight = room.discountedPrice ?? room.actualPrice;
    const amount = pricePerNight * nights;

    // Creating order
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const orderNumber = randomInt(10_000_000, 100_000_000);

      try {
        const result = await this.databaseService.$transaction(async (tx) => {
          // 1. Lock Room
          const lockedRooms = await tx.$queryRaw<Array<{ id: string }>>`
          SELECT "id"
          FROM "Room"
          WHERE "id" = ${room.id}
          FOR UPDATE
        `;

          if (lockedRooms.length === 0) {
            throw new NotFoundException('Room not found!');
          }

          // 2. Expire unpaid orders
          const now = new Date();

          await tx.order.updateMany({
            where: {
              roomId: room.id,
              status: 'PENDING',
              expiresAt: { lte: now },
            },
            data: {
              status: 'EXPIRED',
            },
          });

          // 3. Check existing orders
          const existingOrder = await tx.order.findFirst({
            where: {
              roomId: room.id,
              checkIn: { lt: checkOut },
              checkOut: { gt: checkIn },
              OR: [
                { status: 'CONFIRMED' },
                {
                  status: 'PENDING',
                  expiresAt: { gt: now },
                },
              ],
            },
            include: { room: true },
          });

          if (existingOrder) {
            throw new ConflictException('Room is not available!');
          }

          // 4. Create Order
          let order = await tx.order.create({
            data: {
              orderNumber,
              amount,
              expiresAt,
              checkIn,
              checkOut,
              extraRequest: createOrderDto.extraRequest,

              person: { connect: { id: userId } },
              passenger: { connect: { id: passenger.id } },
              hotel: { connect: { id: hotel.id } },
              room: { connect: { id: room.id } },
            },
          });

          // 5. Create Transaction and simulate from pending to paid
          const transaction = await tx.transaction.create({
            data: {
              codeNumber: randomInt(10_000_000, 100_000_000),
              authority: randomUUID(),
              amount: order.amount,
              expiresAt: order.expiresAt,
              order: {
                connect: { id: order.id },
              },
            },
          });

          order = await tx.order.update({
            where: { id: order.id },
            data: {
              status: 'CONFIRMED',
              room: {
                update: {
                  where: { id: room.id },
                  data: {
                    isReserved: true,
                  },
                },
              },
              transactions: {
                update: {
                  where: { id: transaction.id },
                  data: {
                    paidAt: new Date(),
                    status: 'SUCCESS',
                    refId: randomUUID(),
                  },
                },
              },
            },
            include: { transactions: true },
          });

          return {
            order,
            paymentUrl: `${process.env.BASE_URL}/payment/${transaction.authority}`,
          };
        });

        return result;
      } catch (error) {
        if (!this.isDuplicateOrderNumber(error) || attempt === maxAttempts) {
          throw error;
        }
      }
    }
  }

  //Utility functions
  private isDuplicateOrderNumber(error: unknown): boolean {
    if (
      !(error instanceof Prisma.PrismaClientKnownRequestError) ||
      error.code !== 'P2002'
    ) {
      return false;
    }

    const target = error.meta?.target;

    return Array.isArray(target)
      ? target.includes('orderNumber')
      : typeof target === 'string' && target.includes('orderNumber');
  }
}
