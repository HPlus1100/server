import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CarType, TaxiStatus } from '../types/taxi.enum';

export class CreateTaxiDto {
  @IsNotEmpty()
  @IsInt()
  userNo: number;

  @IsNotEmpty()
  taxiStatus: TaxiStatus;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

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
