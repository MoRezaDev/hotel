import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from './hotel.service.js';
import { CreateHotelDto } from './dto/create-hotel.dto.js';
import { CreateHotelFeaturesDto } from './dto/create-hotel-features.dto.js';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto.js';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { HotelExistsGurd } from '../gurds/hotel-exists.gurd.js';
import { multerMainImageOptions } from '../utils/multer.options.js';

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
  async addExistingFeaturesToHotel(
    @Body() featureDto: { featureIds: string[]; hotelId: string },
  ) {
    return this.hotelService.addExistingFeaturesToHotel(featureDto);
  }
  //for room
  @Post('room/create')
  async createHotelRoom(@Body() createRoomDto: CreateHotelRoomDto) {
    return this.hotelService.createHotelRoom(createRoomDto);
  }

  //for upload
  @Post('upload/:hotelId/image')
  @UseGuards(HotelExistsGurd)
  @UseInterceptors(FileInterceptor('image', multerMainImageOptions()))
  async uploadMain(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(file);
  }

  @Post('upload/:hotelId/images')
  @UseGuards(HotelExistsGurd)
  @UseInterceptors(FilesInterceptor('images', 10, multerMainImageOptions()))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {}
}
