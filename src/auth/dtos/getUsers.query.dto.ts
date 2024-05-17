import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class getUsersQueryDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  id: string;
}
