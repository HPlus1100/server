import { IsNotEmpty } from 'class-validator';
import { TaxiType } from '../types/taxi';

export class CreateCallDto {
  @IsNotEmpty()
  userId: string;
  // 임시, 추후 택시 종류로 변경
  @IsNotEmpty()
  taxiType: TaxiType;
}
