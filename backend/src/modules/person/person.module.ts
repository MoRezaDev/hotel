import { Module } from '@nestjs/common';
import { PersonController } from './person.controller.js';
import { PersonService } from './person.service.js';
import { DatabaseModule } from '../../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonController],
  providers: [PersonService]
})
export class PersonModule {}
