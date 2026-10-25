import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service.js';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  async login(credentials: { mobileNumber: string; password: string }) {
    const person = await this.databaseService.person.findUnique({
      where: { mobileNumber: credentials.mobileNumber },
    });
    if (!person) {
      throw new UnauthorizedException('User not found!');
    }
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      person.password!,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.jwtService.signAsync({id: person.id})
  }

  async signUp() {}

  async loginWithOtp() {}

  async signupWithOtp() {}
}
