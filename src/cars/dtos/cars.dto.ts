import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import {
  CAR_BRANDS,
  FUEL_TYPE,
  TRANSMISSION_TYPES,
  VEHICLE_TYPE,
} from 'src/enums/car.enum';

export class CreateCarDto {
  @IsString()
  brand: CAR_BRANDS;

  @IsString()
  @IsOptional()
  car_name?: string;

  @IsNumber()
  price_per_day: number;

  @IsNumber()
  @IsOptional()
  rate?: number;

  @IsString()
  @IsOptional()
  year?: string;

  @IsEnum(TRANSMISSION_TYPES)
  @IsOptional()
  transmission?: TRANSMISSION_TYPES;

  @IsNumber()
  @IsOptional()
  seats?: number;

  @IsNumber()
  @IsOptional()
  speed?: number;

  @IsEnum(FUEL_TYPE)
  @IsOptional()
  fuel_type?: FUEL_TYPE;

  @IsEnum(VEHICLE_TYPE)
  @IsOptional()
  type?: VEHICLE_TYPE;
}
