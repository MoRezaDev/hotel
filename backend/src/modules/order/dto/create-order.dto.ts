import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  hotelId: string;

  @IsUUID()
  roomId: string;

  @IsUUID()
  passengerId: string;

  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;

  @IsOptional()
  @IsString()
  extraRequest?: string;
}
