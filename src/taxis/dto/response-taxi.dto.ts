import { Exclude, Expose } from 'class-transformer';
import { CarType } from '../types/taxi.enum';

@Exclude()
export class ResponseTaxiDto {
  @Expose()
  no: number;

  @Expose()
  driverNo: number;

  @Expose()
  carType: CarType;

  @Expose()
  companyName: string;

  @Expose()
  carNum: string;

  @Expose()
  carModel: string;
}
