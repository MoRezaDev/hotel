import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HotelModule } from './hotel/hotel.module.js';
import { StorageModule } from '@nestjs/storage';
import { createStorageOptions } from './storage/storage.config.js';
import storageConfigurations from './config/storage.configurations.js';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, load: [storageConfigurations] }),
    HotelModule,
    StorageModule.forRootAsync({
      inject: [ConfigService],
      useFactory: createStorageOptions,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
