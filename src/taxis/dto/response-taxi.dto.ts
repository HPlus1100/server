import { Exclude, Expose } from 'class-transformer';
import { CarType } from '../types/taxi.enum';

@Exclude()
export class ResponseTaxiDto {
  @Expose()
  no: number;

  @Expose()
  driverLicenseNumber: number;

  @Expose()
  carType: CarType;

  @Expose()
  companyName: string;

  @Expose()
  licensePlateNumber: string;

  @Expose()
  carModel: string;
}
