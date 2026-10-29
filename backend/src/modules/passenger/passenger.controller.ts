import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGurd } from '../../gurds/jwt-auth.gurd.js';
import { CreatePassengerDto } from './dto/create-passenger.dto.js';
import { PassengerService } from './passenger.service.js';
import { UpdatePassengerDto } from './dto/update-passenger.dto.js';

@UseGuards(JwtAuthGurd)
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Get('')
  async findAll() {}

  @Post('create')
  async createPassenger(
    @Req() req: Request & { user: { id: string } },
    @Body() createPassengerDto: CreatePassengerDto,
  ) {
    const personId = req.user.id;
    const generatedDto = { ...createPassengerDto, personId };
    return this.passengerService.createPassenger(generatedDto);
  }

  @Patch('')
  async updatePassenger(
    @Body() UpdatePassengerDto: UpdatePassengerDto,
    @Param('id') id: string,
  ) {
    return this.passengerService.updatePassenger(UpdatePassengerDto, id);
  }

  @Delete('')
  async deletePassenger(@Param('id') id: string) {
    return this.passengerService.deletePassenger(id);
  }
}
