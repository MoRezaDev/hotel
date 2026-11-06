import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
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
import { HotelExistsGurd } from '../../gurds/hotel-exists.gurd.js';
import { multerMainImageOptions } from '../../utils/multer.options.js';
import { JwtAuthGurd } from '../../gurds/jwt-auth.gurd.js';
import { Role, RoleAcessGurd } from '../../gurds/role.gurd.js';
import { UpdateHotelDto } from './dto/update-hotel.dto.js';
import { UpdateHotelFeatureDto } from './dto/update-hotel-features.dto.js';

@Controller('hotel')
@UseGuards(JwtAuthGurd)
@Role('admin')
@UseGuards(RoleAcessGurd)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}
  @Get()
  async findAll() {
    return this.hotelService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {}

  @Post('create')
  async createHotel(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.createHotel(createHotelDto);
  }

  @Patch('update/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body() updateHotelDto: UpdateHotelDto,
  ) {
    return this.hotelService.updateHotel(updateHotelDto, id);
  }

  @Delete('delete')
  async removeAllHotells() {
    return this.hotelService.removeAllHotells();
  }
  @Delete('delete/:id')
  async removeHotel(id: string) {
    return this.hotelService.removeHotel(id);
  }

  @Delete('image')
  @UseGuards(HotelExistsGurd)
  async deleteAllImages(@Req() req: Request & { hotelId: string }) {
    const id = req.hotelId;
    await this.hotelService.deleteAllImages(id);
    return { message: 'success!' };
  }

  @Delete('image/main/:id')
  @UseGuards(HotelExistsGurd)
  async deleteMainImage(@Param('id') id: string) {
    await this.hotelService.deleteMainImage(id);
  }

  @Delete('image/images/:id')
  @UseGuards(HotelExistsGurd)
  async deleteImages(@Param('id') id: string) {
    await this.hotelService.deleteImages(id);
  }

  //For hotel features
  @Get('feature')
  async getAllHotelFeatures() {
    return this.hotelService.getAllHotelFeatures();
  }

  @Get('feature/find/:id')
  async findOneFeature(@Param('id') id: string) {
    return this.hotelService.findOneFeature(id);
  }

  @Patch('feature/update')
  async updateFeature(
    @Body() updateHotelFeatureDto: UpdateHotelFeatureDto,
    @Param('id') id: string,
  ) {
    return this.hotelService.updateFeature(updateHotelFeatureDto, id);
  }

  @Delete('feature/delete')
  async deleteAllHotellFeature() {
    return this.hotelService.deleteAllHotellFeature();
  }

  @Delete('feature/delete/:id')
  async deleteHotelFeature(@Param('id') id: string) {
    return this.hotelService.deleteHotelFeature(id);
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
    @Param('id') id: string,
  ) {
    console.log('ajab baba');
    console.log(file.destination);
  }

  @Post('upload/:hotelId/images')
  @UseGuards(HotelExistsGurd)
  @UseInterceptors(FilesInterceptor('images', 10, multerMainImageOptions()))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {}
}
