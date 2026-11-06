import { Controller } from '@nestjs/common';
import { PublicService } from './public.service.js';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  async getAllHotells() {
    return this.publicService.getAllHotells();
  }
}
