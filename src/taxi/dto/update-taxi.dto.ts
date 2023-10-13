import { IsInt, IsString } from 'class-validator';
import { CarType } from '../types/taxi.enum';

export class UpdateTaxiDto {
  @IsInt()
  driverNo: number;

  carType: CarType;

  @IsString()
  companyName: string;

  @IsString()
  carNum: string;

  @IsString()
  carModel: string;
}
