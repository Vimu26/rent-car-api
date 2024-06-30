import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import {
  CAR_BRANDS,
  FUEL_TYPE,
  TRANSMISSION_TYPES,
  VEHICLE_TYPE,
} from 'src/enums/car.enum';

export class GetCarsByRatingDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}

export class CarsQueryDto extends GetCarsByRatingDto {
  @IsString()
  @IsOptional()
  brand?: CAR_BRANDS;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  minRate?: number;

  @IsString()
  @IsOptional()
  year?: string;

  @IsEnum(TRANSMISSION_TYPES)
  @IsOptional()
  transmission?: TRANSMISSION_TYPES;

  @IsEnum(FUEL_TYPE)
  @IsOptional()
  fuel_type?: FUEL_TYPE;

  @IsEnum(VEHICLE_TYPE)
  @IsOptional()
  type?: VEHICLE_TYPE;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  minSeats?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  maxSeats?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  minSpeed?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  maxSpeed?: number;
}
