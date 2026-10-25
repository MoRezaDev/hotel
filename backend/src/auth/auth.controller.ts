import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { JwtAuthGurd } from '../gurds/jwt-auth.gurd.js';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() credentials: { mobileNumber: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.login(credentials);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    return { message: 'Login Successfull!' };
  }

  @UseGuards(JwtAuthGurd)
  @Get('protected')
  async protected(@Req() req: Request & { user: any }) {
    console.log(req.user);
    return { message: 'ok!' };
  }
}
