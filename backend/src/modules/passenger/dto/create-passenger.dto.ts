import {
  IsEnum,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '../../../generated/prisma/enums.js';

export class CreatePassengerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @MinLength(10)
  @MaxLength(10)
  @IsString()
  codeNational: string;

  @Matches(/^0?9\d{9}$/)
  @IsString()
  mobileNumber: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsUUID()
  @IsString()
  personId: string;
}
