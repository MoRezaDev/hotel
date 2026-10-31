import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service.js';
import { JwtAuthGurd } from '../../gurds/jwt-auth.gurd.js';
import { CurrentUser } from '../../common/decorators/curret-user.decorator.js';

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
}
