import { Exclude, Expose } from 'class-transformer';
import { CarType } from '../types/taxi.enum';

@Exclude()
export class ResponseTaxiDto {
  @Expose()
  no: number;

  @Expose()
  driver_no: number;

  @Expose()
  type: CarType;

  @Expose()
  company_name: string;

  @Expose()
  car_num: string;

  @Expose()
  car_model: string;
}
