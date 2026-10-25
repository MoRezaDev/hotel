import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HotelModule } from './modules/hotel/hotel.module.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PersonModule } from './modules/person/person.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HotelModule,
    DatabaseModule,
    AuthModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
