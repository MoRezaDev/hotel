import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller.js';
import { PassengerService } from './passenger.service.js';
import { DatabaseModule } from '../../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
