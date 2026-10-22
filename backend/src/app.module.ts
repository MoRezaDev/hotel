import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HotelModule } from './hotel/hotel.module.js';
import { DatabaseModule } from './database/database.module.js';
=======
import { DatabaseModule } from './database/database.module.js';
import { HotelModule } from './hotel/hotel.module.js';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
>>>>>>> 33b4ae03f837e4ab0f5ba609d9a12d7810466d66

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
<<<<<<< HEAD
    HotelModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
=======
    DatabaseModule,
    HotelModule,
  ],
  providers: [AppService],
  controllers: [AppController],
>>>>>>> 33b4ae03f837e4ab0f5ba609d9a12d7810466d66
})
export class AppModule {}
