import { Module } from '@nestjs/common';
import { CarsController } from './controllers/cars.controller';
import { CarsDatabaseService } from './services/cars.database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './models/cars.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cars', schema: CarSchema }])],
  controllers: [CarsController],
  providers: [CarsDatabaseService],
})
export class CarsModule {}
