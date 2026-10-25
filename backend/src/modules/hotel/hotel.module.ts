import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller.js';
import { HotelService } from './hotel.service.js';
import { DatabaseModule } from '../../database/database.module.js';

@Module({
  controllers: [HotelController],
  providers: [HotelService],
  imports: [DatabaseModule],
})
export class HotelModule {}
