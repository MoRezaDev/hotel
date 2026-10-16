import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

function NotEmptyString() {
  return applyDecorators(IsOptional(), IsString(), IsNotEmpty());
}

function ArrayNotEmptyString() {
  return applyDecorators(
    IsOptional(),
    IsArray(),
    ArrayNotEmpty(),
    IsString({ each: true }),
    IsNotEmpty({ each: true }),
  );
}

export class DistanceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateHotelDto {
  @NotEmptyString()
  name: string;

  @NotEmptyString()
  title: string;

  @NotEmptyString()
  slug: string;

  @NotEmptyString()
  description: string;

  @NotEmptyString()
  address: string;

  @NotEmptyString()
  city: string;

  @NotEmptyString()
  state: string;

  @NotEmptyString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  starRating: number;

  @IsOptional()
  @IsBoolean()
  isInstallment?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => DistanceDto)
  distances?: DistanceDto[];

  @IsNotEmpty()
  @IsNumber()
  entryTime: number;

  @IsNotEmpty()
  @IsNumber()
  exitTime: number;

  @IsNotEmpty()
  @IsDateString()
  entryDate: string;

  @IsNotEmpty()
  @IsDateString()
  exitDate: string;

  @IsOptional()
  @IsBoolean()
  isSuggested?: boolean;

  @ArrayNotEmptyString()
  rulesDescriptions?: string[];

  @NotEmptyString()
  mainImageUrl?: string;

  @ArrayNotEmptyString()
  imagesUrl?: string[];
}
