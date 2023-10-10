import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CarType } from '../types/taxi.enum';

export class CreateTaxiDto {
  @IsNotEmpty()
  @IsInt()
  driver_no: number;

  @IsNotEmpty()
  type: CarType;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  car_num: string;

  @IsNotEmpty()
  @IsString()
  car_model: string;
}
