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
import { LoginCredentialsDto } from './dto/login-credentials.dto.js';
import { SendOtpDto } from './dto/send-otp.dto.js';
import { LoginOtpDto } from './dto/login-otp.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() credentials: LoginCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.login(credentials);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    return { message: 'Login Successfull!' };
  }

  @Post('send-otp')
  async sendOtp(@Body() sendOtp: SendOtpDto) {
    return this.authService.sendOtp(sendOtp);
  }

  @Post('login-otp')
  async loginWithOtp(
    @Body() loginOtpDto: LoginOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.loginWithOtp(loginOtpDto);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    return { message: 'success!' };
  }

  @UseGuards(JwtAuthGurd)
  @Get('protected')
  async protected(@Req() req: Request & { user: any }) {
    return { message: 'ok!' };
  }
}
