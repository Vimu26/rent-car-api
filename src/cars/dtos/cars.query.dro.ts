import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { CAR_BRANDS, TRANSMISSION_TYPES } from 'src/enums/car.enum';

export class CarsQueryDto {
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
