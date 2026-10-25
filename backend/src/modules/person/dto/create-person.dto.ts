import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Gender } from '../../../generated/prisma/enums.js';

export class CreatePersonDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  firstNameEn?: string;

  @IsOptional()
  @IsString()
  lastNameEn?: string;

  @IsString()
  @Matches(/^0?9\d{9}$/)
  mobileNumber: string;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsString()
  codeNational?: string;

  @IsOptional()
  @IsString()
  passportNumber?: string;

  @IsOptional()
  @IsString()
  passportExpireDate?: string;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsBoolean()
  isVip?: boolean;

  @IsOptional()
  @IsBoolean()
  isBanned?: boolean;

  @IsOptional()
  @IsString()
  @Matches(/^(user|admin)$/, { message: 'role must be correct value' })
  role?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString({})
  @MinLength(6)
  password?: string;
}
