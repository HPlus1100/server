import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaxiDto {
  // @Expose : 서로 이름/컨벤션이 다른 경우 사용
  @Expose({ name: 'no' }) // name에 일치하는 값으로 매핑
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
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
