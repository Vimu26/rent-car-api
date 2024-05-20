import { Schema } from 'mongoose';
import { ICar } from '../types/car.types';
import {
  CAR_BRANDS,
  FUEL_TYPE,
  TRANSMISSION_TYPES,
  VEHICLE_TYPE,
} from 'src/enums/car.enum';

export const CarSchema = new Schema<ICar>({
  brand: {
    type: String,
    enum: CAR_BRANDS,
    default: CAR_BRANDS.ALL,
    required: true,
  },
  car_name: {
    type: String,
    required: false,
  },
  price_per_day: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  transmission: {
    type: String,
    enum: TRANSMISSION_TYPES,
    default: TRANSMISSION_TYPES.ALL,
    required: false,
  },
  fuel_type: {
    type: String,
    enum: FUEL_TYPE,
    required: true,
    default: FUEL_TYPE.OTHER,
  },
  type: {
    type: String,
    enum: VEHICLE_TYPE,
    required: true,
    default: VEHICLE_TYPE.OTHER,
  },
  seats: {
    type: Number,
    required: false,
  },
  speed: {
    type: Number,
    required: false,
  },
});

// export const CarModel = model<ICar>('Cars', CarSchema);
