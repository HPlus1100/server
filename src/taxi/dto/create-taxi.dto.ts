import { IsInt, IsString } from 'class-validator';

export class CreateTaxiDto {
  @IsInt()
  driver_no: number;

  @IsInt()
  type: string;

  @IsString()
  company_name: string;

  @IsString()
  car_num: string;

  @IsString()
  car_model: string;
}
