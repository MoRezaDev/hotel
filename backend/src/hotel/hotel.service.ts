import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateHotelDto } from './dto/create-hotel.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { CreateHotelFeaturesDto } from './dto/create-hotel-features.dto.js';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto.js';
import { UpdateHotelDto } from './dto/update-hotel.dto.js';

@Injectable()
export class HotelService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.hotel.findMany({
      include: { rooms: true, features: true, comments: true },
    });
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

  async updateHotel(updateHotelDto: UpdateHotelDto, id: string) {
    return await this.databaseService.hotel.update({
      where: { id },
      data: updateHotelDto,
    });
  }

  //for hotel features
  async getAllHotelFeatures() {
    return await this.databaseService.hotelFeatures.findMany({});
  }
  async createHotelFeatures(createHotelFeatures: CreateHotelFeaturesDto[]) {
    return await this.databaseService.hotelFeatures.createMany({
      data: createHotelFeatures,
    });
  }

  async addExistingFeaturesToHotel(featureDto: {
    featureIds: string[];
    hotelId: string;
  }) {
    return await this.databaseService.hotel.update({
      where: { id: featureDto.hotelId },
      data: {
        features: { connect: featureDto.featureIds.map((id) => ({ id })) },
      },
    });
  }

  //for  Room
  async createHotelRoom(createRoomDto: CreateHotelRoomDto) {
    return await this.databaseService.room.create({ data: createRoomDto });
  }
}
