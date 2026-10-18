import { Body, Controller, Get, Post } from '@nestjs/common';
import { HotelService } from './hotel.service.js';
import { CreateHotelDto } from './dto/create-hotel.dto.js';
import { CreateHotelFeaturesDto } from './dto/create-hotel-features.dto.js';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto.js';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}
  @Get()
  async findAll() {
    return this.hotelService.findAll();
  }
  @Post('create')
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.createHotel(createHotelDto);
  }

  //for hotel features
  @Get('feature')
  async getAllHotelFeatures() {
    return this.hotelService.getAllHotelFeatures();
  }
  @Post('feature/create')
  async createHotelFeatures(
    @Body() createHotelFeatures: CreateHotelFeaturesDto[],
  ) {
    return this.hotelService.createHotelFeatures(createHotelFeatures);
  }

  @Post('feature/connect')
  async addExistingFeaturesToHotel(featureDto : {featureIds: string[],hotelId: string}) {
    return this.hotelService.addExistingFeaturesToHotel(featureDto)
  }
  //for room
  @Post('room/create')
  async createHotelRoom(@Body() createRoomDto: CreateHotelRoomDto) {
    return this.hotelService.createHotelRoom(createRoomDto);
  }
}
