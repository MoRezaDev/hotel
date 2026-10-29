import { IsString, Matches } from 'class-validator';

export class LoginOtpDto {
  @Matches(/^0?9\d{9}$/)
  mobileNumber: string;

  @IsString()
  code: string;
}
