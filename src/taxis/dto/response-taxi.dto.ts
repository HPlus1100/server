import { Exclude, Expose } from 'class-transformer';
import { CarType, TaxiStatus } from '../types/taxi.enum';

@Exclude()
export class ResponseTaxiDto {
  @Expose()
  no: number;

  @Expose()
  userNo: number;

  @Expose()
  taxiStatus: TaxiStatus;

  @Expose()
  name: string;

  @Expose()
  phone: string;

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

  isDeleted: boolean;

  cratedAt: Date;

  updatedAt: Date;
}
