import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHotelRoomDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  extraInfo?: string;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsBoolean()
  breakfast?: boolean;

  @IsOptional()
  @IsBoolean()
  dinner?: boolean;

  @IsOptional()
  @IsBoolean()
  extraBed?: boolean;

  @IsOptional()
  @IsBoolean()
  isMainContent?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsNumber()
  actualPrice: number;

  @IsOptional()
  @IsNumber()
  discountedPrice?: number;

  @IsOptional()
  @IsNumber()
  discountPercent?: number;

  @IsString()
  HotelId: string;
}
