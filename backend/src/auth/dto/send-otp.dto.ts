import { Matches } from 'class-validator';

export class SendOtpDto {
  @Matches(/^0?9\d{9}$/)
  mobileNumber: string;
}
