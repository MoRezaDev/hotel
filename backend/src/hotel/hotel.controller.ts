import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from './hotel.service.js';
import { CreateHotelDto } from './dto/create-hotel.dto.js';
import { CreateHotelFeaturesDto } from './dto/create-hotel-features.dto.js';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { StoredUpload, uploadToDisk } from '@nestjs/storage';

export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5 MiB
/** Every photo gets a new key, so browsers and the CDN may cache it forever. */
export const PHOTO_CACHE_CONTROL = 'public, max-age=31536000, immutable';

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
  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: uploadToDisk({
        cacheControl: PHOTO_CACHE_CONTROL,
        contentTypes: PHOTO_TYPES,
        disk: 'hotelPhotos',
        key(file, req) {
          console.log(req.body);
          return `ajab`;
        },
      }),
      limits: { files: 1, fileSize: MAX_PHOTO_SIZE },
    }),
  )
  async uploadImage(@UploadedFile() file: StoredUpload | undefined) {
    console.log(file);
    console.log('ok!');
  }
}
