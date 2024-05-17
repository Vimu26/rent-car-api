import { Types } from 'mongoose';
import { CAR_BRANDS, TRANSMISSION_TYPES } from 'src/enums/car.enum';

export interface ICar {
  _id?: string | Types.ObjectId;
  brand?: CAR_BRANDS;
  car_name?: string;
  price_per_day: number;
  rate?: number;
  year?: string;
  transmission?: TRANSMISSION_TYPES;
  seats?: number;
  speed?: number;
}
