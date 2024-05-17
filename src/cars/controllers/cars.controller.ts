import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CarsDatabaseService } from '../services/cars.database.service';
import { ICar } from '../types/car.types';
import { CreateCarDto } from '../dtos/cars.dto';
import { CarsQueryDto } from '../dtos/cars.query.dro';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsDatabaseService) {}

  @Get()
  async getCars(@Query() queryParams: CarsQueryDto) {
    return await this.carsService.getCars(queryParams);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ICar> {
    return await this.carsService.findById(id);
  }

  @Post()
  async create(@Body() car: CreateCarDto): Promise<ICar> {
    return await this.carsService.create(car);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() car: ICar): Promise<ICar> {
    return await this.carsService.update(id, car);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ICar> {
    return await this.carsService.delete(id);
  }
}
