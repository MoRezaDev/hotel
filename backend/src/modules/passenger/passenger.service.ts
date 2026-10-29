import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreatePassengerDto } from './dto/create-passenger.dto.js';
import { UpdatePassengerDto } from './dto/update-passenger.dto.js';

@Injectable()
export class PassengerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(personId: string) {
    return this.databaseService.passenger.findMany({ where: { personId } });
  }

  async createPassenger(createPassengerDto: CreatePassengerDto) {
    return await this.databaseService.passenger.create({
      data: createPassengerDto,
    });
  }

  async updatePassenger(updatePassengerDto: UpdatePassengerDto, id: string) {
    return await this.databaseService.passenger.update({
      where: { id },
      data: updatePassengerDto,
    });
  }

  async deletePassenger(id: string) {
    return this.databaseService.passenger.delete({ where: { id } });
  }
}
