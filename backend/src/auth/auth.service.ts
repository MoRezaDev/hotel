import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service.js';
import bcrypt from 'bcrypt';
import { SendOtpDto } from './dto/send-otp.dto.js';
import { randomInt } from 'node:crypto';
import { LoginOtpDto } from './dto/login-otp.dto.js';

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
    return this.jwtService.signAsync({ id: person.id });
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    const code = randomInt(100000, 999999).toString();
    const hashedCode = await bcrypt.hash(code, 10);
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    const existedPerson = await this.databaseService.person.findUnique({
      where: { mobileNumber: sendOtpDto.mobileNumber },
    });

    if (!existedPerson) {
      await this.databaseService.person.create({
        data: {
          mobileNumber: sendOtpDto.mobileNumber,
          otp: {
            create: {
              code: hashedCode,
              expiresAt,
            },
          },
        },
      });
      return { code };
    }
    await this.databaseService.person.update({
      where: {
        id: existedPerson.id,
      },
      data: {
        otp: {
          upsert: {
            update: {
              code: hashedCode,
              expiresAt,
            },
            create: {
              code: hashedCode,
              expiresAt,
            },
          },
        },
      },
    });
    return { code };
  }

  async loginWithOtp(loginOtpDto: LoginOtpDto) {
    const result = await this.databaseService.$transaction(async (tx) => {
      const existedPerson = await tx.person.findUnique({
        where: { mobileNumber: loginOtpDto.mobileNumber },
        include: { otp: true },
      });
      if (!existedPerson) throw new UnauthorizedException('no user found!');
      if (!existedPerson.otp)
        throw new UnauthorizedException('no otp founded!');
      const codeMatched = await bcrypt.compare(
        loginOtpDto.code,
        existedPerson.otp.code,
      );
      if (!codeMatched) throw new UnauthorizedException('otp code is wrong!');
      if (existedPerson.otp.expiresAt <= new Date()) {
        console.log('must be expired!');
        throw new UnauthorizedException('otp has expired!');
      }
      await tx.otp.delete({ where: { personId: existedPerson.id } });
      return await this.jwtService.signAsync({ id: existedPerson.id });
    });
    return result;
  }
}
