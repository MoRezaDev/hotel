import { Module } from '@nestjs/common';
import { PublicController } from './public.controller.js';
import { PublicService } from './public.service.js';
import { DatabaseModule } from '../../database/database.module.js';

@Module({
  controllers: [PublicController],
  providers: [PublicService],
  imports: [DatabaseModule],
})
export class PublicModule {}
