import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CarsDatabaseService } from '../services/cars.database.service';
import { ICar } from '../types/car.types';
import { CreateCarDto } from '../dtos/cars.dto';
import { CarsQueryDto, GetCarsByRatingDto } from '../dtos/cars.query.dro';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsDatabaseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCars(@Query() queryParams: CarsQueryDto) {
    return await this.carsService.getCars(queryParams);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ICar> {
    return await this.carsService.findById(id);
  }

  @Get('get/ratings')
  async getCarsByRating(@Query() queryParams: GetCarsByRatingDto) {
    return await this.carsService.getCarsByRating(queryParams);
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
