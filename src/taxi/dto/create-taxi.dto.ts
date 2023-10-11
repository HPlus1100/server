import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CarType } from '../types/taxi.enum';

export class CreateTaxiDto {
  @IsNotEmpty()
  @IsInt()
  driverNo: number;

  @IsNotEmpty()
  carType: CarType;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  carNum: string;

  @IsNotEmpty()
  @IsString()
  carModel: string;
}
