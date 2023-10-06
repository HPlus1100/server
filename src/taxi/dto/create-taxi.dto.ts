import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaxiDto {
  @IsNotEmpty()
  @IsInt()
  driver_no: number;

  @IsNotEmpty()
  @IsInt()
  type: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  car_num: string;

  @IsNotEmpty()
  @IsString()
  car_model: string;
}
