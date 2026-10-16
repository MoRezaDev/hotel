import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateHotelDto } from './dto/create-hotel.dto.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class HotelService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.hotel.findMany();
  }

  async createHotel(createHotelDto: CreateHotelDto) {
    return await this.databaseService.hotel.create({
      data: {
        ...createHotelDto,
        distances: createHotelDto.distances
          ? (createHotelDto.distances.map(({ title, value }) => ({
              title,
              value,
            })) satisfies Prisma.InputJsonArray)
          : undefined,
      },
    });
  }
}
