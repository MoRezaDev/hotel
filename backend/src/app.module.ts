import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { HotelModule } from './hotel/hotel.module.js';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HotelModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
