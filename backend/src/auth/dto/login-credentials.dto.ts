import { IsString, Matches, MinLength } from 'class-validator';

export class LoginCredentialsDto {
  @Matches(/^0?9\d{9}$/)
  @IsString()
  mobileNumber: string;

  @MinLength(6)
  @IsString()
  password: string;
}
