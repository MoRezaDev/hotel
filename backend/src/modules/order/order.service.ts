import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

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
    const passenger = await this.databaseService.passenger.findUnique({
      where: { id: createOrderDto.passengerId, personId: userId },
    });
  }
}
