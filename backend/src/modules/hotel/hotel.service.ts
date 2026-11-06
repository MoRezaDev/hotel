import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateHotelDto } from './dto/create-hotel.dto.js';
import { Prisma } from '../../generated/prisma/client.js';
import { CreateHotelFeaturesDto } from './dto/create-hotel-features.dto.js';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto.js';
import { UpdateHotelDto } from './dto/update-hotel.dto.js';
import { UpdateHotelFeatureDto } from './dto/update-hotel-features.dto.js';
import { join } from 'node:path';
import { rm } from 'node:fs/promises';

@Injectable()
export class HotelService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.hotel.findMany({
      include: { rooms: true, features: true, comments: true },
    });
  }

  async findOne(id: string) {
    const hotel = await this.databaseService.hotel.findUnique({
      where: { id },
    });
    if (!hotel) throw new NotFoundException('No hotel found!');
    return hotel;
  }

  async createHotel(createHotelDto: CreateHotelDto) {
    const { hotelFeatureIds, distances, ...hotelData } = createHotelDto;
    return await this.databaseService.hotel.create({
      data: {
        ...hotelData,
        distances: distances
          ? (distances.map(({ title, value }) => ({
              title,
              value,
            })) satisfies Prisma.InputJsonArray)
          : undefined,
        features: hotelFeatureIds?.length
          ? { connect: hotelFeatureIds.map((id) => ({ id })) }
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

  async removeHotel(id: string) {
    const result = await this.databaseService.hotel.delete({ where: { id } });
    if (!result) throw new NotFoundException('No hotel found!');
  }

  async removeAllHotells() {
    return await this.databaseService.hotel.deleteMany();
  }

  //For images
  async uploadMainImage(hotelId: string) {
    try {
      await this.databaseService.hotel.update({where: {id: hotelId},data: {mainImageUrl: ''}})
    }catch (err) {}
  }

  async deleteAllImages(hotelId: string) {
    try {
      const deletePath = join(process.cwd(), 'upload', hotelId);
      await rm(deletePath, { force: true, recursive: true });
      await this.databaseService.hotel.update({
        where: { id: hotelId },
        data: { imagesUrl: [], mainImageUrl: null },
      });
    } catch (err: any) {
      throw new Error(err.message || 'Somethings wrong with delete images!');
    }
  }

  async deleteMainImage(hotelId: string) {
    try {
      const deletePath = join(process.cwd(), 'upload', hotelId, 'main');
      await rm(deletePath, { force: true, recursive: true });
      await this.databaseService.hotel.update({
        where: { id: hotelId },
        data: { mainImageUrl: null },
      });
    } catch (err: any) {
      throw new Error(err.message || 'Somethings wrong with delete image!');
    }
  }

  async deleteImages(hotelId: string) {
    try {
      const deletePath = join(process.cwd(), 'upload', hotelId, 'images');
      await rm(deletePath, { force: true, recursive: true });
      await this.databaseService.hotel.update({
        where: { id: hotelId },
        data: { imagesUrl: [] },
      });
    } catch (err: any) {
      throw new Error(err.message || 'Somethings wrong with delete image!');
    }
  }

  //for hotel features
  async getAllHotelFeatures() {
    return await this.databaseService.hotelFeatures.findMany({});
  }

  async findOneFeature(id: string) {
    const feature = await this.databaseService.hotelFeatures.findUnique({
      where: { id },
    });
    if (!feature) throw new NotFoundException('Hotel feature not found!');
    return feature;
  }

  async updateFeature(
    updateHotelFeatureDto: UpdateHotelFeatureDto,
    id: string,
  ) {
    return await this.databaseService.hotelFeatures.update({
      where: { id },
      data: updateHotelFeatureDto,
    });
  }

  async deleteAllHotellFeature() {
    return await this.databaseService.hotelFeatures.deleteMany();
  }

  async deleteHotelFeature(id: string) {
    return await this.databaseService.hotelFeatures.delete({ where: { id } });
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
