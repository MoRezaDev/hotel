import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';

@Injectable()
export class PublicService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllHotells() {
    return await this.databaseService.hotel.findMany({
      include: {
        comments: { include: { user: true } },
        features: true,
        rooms: true,
      },
    });
  }
}
