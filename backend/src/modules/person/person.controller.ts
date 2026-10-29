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
import { PersonService } from './person.service.js';
import { CreatePersonDto } from './dto/create-person.dto.js';
import { UpdatePersonDto } from './dto/update-person.dto.js';
import { JwtAuthGurd } from '../../gurds/jwt-auth.gurd.js';
import { CreatePassengerDto } from '../passenger/dto/create-passenger.dto.js';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  @Get()
  async findAll() {
    return this.personService.findAll();
  }

  @Post('create')
  async create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Patch('update')
  async update(@Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(updatePersonDto);
  }

  //Query params watermark
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }
}
