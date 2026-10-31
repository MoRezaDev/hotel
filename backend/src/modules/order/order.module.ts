import { Module } from '@nestjs/common';
import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';
import { DatabaseModule } from '../../database/database.module.js';

@Module({
  imports:[DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
