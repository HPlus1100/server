import { IsInt, IsString } from 'class-validator';
import { CarType } from '../types/taxi.enum';

export class UpdateTaxiDto {
  @IsInt()
  driverLicenseNumber: number;

  carType: CarType;

  @IsString()
  companyName: string;

  @IsString()
  licensePlateNumber: string;

  @IsString()
  carModel: string;
}
