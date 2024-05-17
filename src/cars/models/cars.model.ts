import { Schema } from 'mongoose';
import { ICar } from '../types/car.types';
import { CAR_BRANDS, TRANSMISSION_TYPES } from 'src/enums/car.enum';

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
