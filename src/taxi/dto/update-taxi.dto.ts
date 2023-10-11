import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CarType } from '../types/taxi.enum';

export class UpdateTaxiDto {
  // @Expose : 서로 이름/컨벤션이 다른 경우 사용
  @Expose() // name에 일치하는 값으로 매핑
  @IsNotEmpty()
  @IsInt()
  no: number;

  @IsNotEmpty()
  @IsInt()
  driverNo: number;

  @IsNotEmpty()
  carType: CarType;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  carNum: string;

  @IsNotEmpty()
  @IsString()
  carModel: string;
}
