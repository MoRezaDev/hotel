import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateHotelFeaturesDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    imageUrl? : string
}