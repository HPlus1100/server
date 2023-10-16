import { Exclude, Expose } from 'class-transformer';
import { CarType } from '../types/taxi.enum';

@Exclude()
export class ResponseTaxiDto {
  @Expose()
  no: number;

  @Expose()
  userNo: number;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  profileImg: string;

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
