import { Module } from '@nestjs/common';
import { CarsController } from './controllers/cars.controller';
import { CarsDatabaseService } from './services/cars.database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './models/cars.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cars', schema: CarSchema }]),
    AuthModule,
  ],
  controllers: [CarsController],
  providers: [CarsDatabaseService],
})
export class CarsModule {}
