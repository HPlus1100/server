import { IsNotEmpty } from 'class-validator';
import { TaxiType } from '../../types/taxi';

export class CreateCallDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  taxiType: TaxiType;
}
