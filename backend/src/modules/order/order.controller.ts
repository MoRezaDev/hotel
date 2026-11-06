import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service.js';
import { JwtAuthGurd } from '../../gurds/jwt-auth.gurd.js';
import { CurrentUser } from '../../common/decorators/curret-user.decorator.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Controller('order')
@UseGuards(JwtAuthGurd)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('me')
  async findMyOrders(@CurrentUser('id') userId: string) {
    return this.orderService.findMyOrders(userId);
  }

  @Post('create')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser('id') id: string,
  ) {
    return await this.orderService.createOrder(id, createOrderDto);
  }

  @Post('race-test')
  async raceTest() {
    const user1 = {
      userId: 'd5387ed2-760a-4f68-94a2-e9630221530c',
      dto: {
        passengerId: '41e9262e-b18b-4a63-9bc0-35489e04046e',
        hotelId: '0e52d753-b041-4443-bbd5-65dd681c48be',
        roomId: '4e192a99-1c45-402e-acfb-613f34d94b54',
        checkIn: '2026-11-10',
        checkOut: '2026-11-15',
      },
    };

    const user2 = {
      userId: 'c96f5dbd-9396-4fb1-b4f4-d81c9ab52ce3',
      dto: {
        passengerId: '29f66bf1-d01a-4c26-b070-18f7a0d55688',
        hotelId: '0e52d753-b041-4443-bbd5-65dd681c48be',
        roomId: '4e192a99-1c45-402e-acfb-613f34d94b54',
        checkIn: '2026-11-10',
        checkOut: '2026-11-15',
      },
    };

    return Promise.allSettled([
      this.orderService.createOrder(user1.userId, user1.dto),
      this.orderService.createOrder(user2.userId, user2.dto),
    ]);
  }
}
