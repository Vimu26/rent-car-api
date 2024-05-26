import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ICar } from '../types/car.types';
import { CarsQueryDto, GetCarsByRatingDto } from '../dtos/cars.query.dro';

@Injectable()
export class CarsDatabaseService {
  constructor(@InjectModel('Cars') private carModel: Model<ICar>) {}

  async getCars(queryParams: CarsQueryDto): Promise<ICar[]> {
    const filters: FilterQuery<ICar> = {};

    if (queryParams.brand) {
      filters.brand = queryParams.brand;
    }
    if (queryParams.transmission) {
      filters.transmission = queryParams.transmission;
    }
    if (queryParams.minPrice) {
      filters.price_per_day = { $gte: queryParams.minPrice };
    }
    if (queryParams.maxPrice) {
      filters.price_per_day = {
        ...filters.price_per_day,
        $lte: queryParams.maxPrice,
      };
    }

    return await this.carModel.find(filters).exec();
  }

  async getCarsByRating(queryParams: GetCarsByRatingDto) {
    const limit = Number(queryParams.limit);
    const cars = await this.carModel.aggregate([
      {
        $sort: {
          rate: -1,
          brand: 1,
          car_name: 1,
        },
      },
      {
        $project: {
          _id: 1,
          rate: 1,
          car_name: 1,
          price_per_day: 1,
          brand: 1,
          seats: 1,
          speed: 1,
          transmission: 1,
        },
      },
      {
        $skip: (queryParams.page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);
    return cars;
  }

  async findById(id: string): Promise<ICar> {
    return await this.carModel.findById(id).exec();
  }

  async create(car: ICar): Promise<ICar> {
    const createdCar = new this.carModel(car);
    return await createdCar.save();
  }

  async update(id: string, car: ICar): Promise<ICar> {
    return await this.carModel.findByIdAndUpdate(id, car, { new: true }).exec();
  }

  async delete(id: string): Promise<ICar> {
    return await this.carModel.findByIdAndDelete(id).exec();
  }
}
