import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsNumber()
  userRating: number;

  @IsUUID()
  userId: string;

  @IsUUID()
  hotelId: string;
}
