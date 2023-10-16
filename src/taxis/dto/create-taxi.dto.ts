import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CarType } from '../types/taxi.enum';

export class CreateTaxiDto {
  @IsNotEmpty()
  @IsInt()
  driverLicenseNumber: number;

  @IsNotEmpty()
  carType: CarType;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  licensePlateNumber: string;

  @IsNotEmpty()
  @IsString()
  carModel: string;
}
