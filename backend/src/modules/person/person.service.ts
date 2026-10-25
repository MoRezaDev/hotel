import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreatePersonDto } from './dto/create-person.dto.js';
import { UpdatePersonDto } from './dto/update-person.dto.js';

@Injectable()
export class PersonService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.person.findMany();
  }

  async create(createPersonDto: CreatePersonDto) {
    return await this.databaseService.person.create({ data: createPersonDto });
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
