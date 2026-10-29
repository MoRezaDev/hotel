import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreatePersonDto } from './dto/create-person.dto.js';
import { UpdatePersonDto } from './dto/update-person.dto.js';

import bcrypt from 'bcrypt';

@Injectable()
export class PersonService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.person.findMany({
      include: { comments: true, orders: true, passengers: true, otp: true },
    });
  }

  async create(createPersonDto: CreatePersonDto) {
    const hashedPwd = await bcrypt.hash(createPersonDto.password!, 10);
    return await this.databaseService.person.create({
      data: { ...createPersonDto, password: hashedPwd },
    });
  }

  async update(updatePersonDto: UpdatePersonDto & { id: string }) {
    return await this.databaseService.person.update({
      where: { id: updatePersonDto.id },
      data: updatePersonDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.person.delete({ where: { id } });
  }

  async findOne(id: string) {
    return await this.databaseService.person.findUnique({ where: { id } });
  }
}
