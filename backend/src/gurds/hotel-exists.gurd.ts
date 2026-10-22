import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Request } from 'express';

@Injectable()
export class HotelExistsGurd implements CanActivate {
  constructor(private readonly databaseService: DatabaseService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const hotelId = req.params.hotelId as string;
    const hotel = await this.databaseService.hotel.findUnique({
      where: { id: hotelId },
    });
    if (!hotel) {
      throw new NotFoundException('hotel not found!');
    }
    return true;
  }
}
