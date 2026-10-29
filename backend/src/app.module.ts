import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HotelModule } from './modules/hotel/hotel.module.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PersonModule } from './modules/person/person.module.js';
import { PassengerModule } from './modules/passenger/passenger.module.js';
import { CommentModule } from './modules/comment/comment.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HotelModule,
    DatabaseModule,
    AuthModule,
    PersonModule,
    PassengerModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
