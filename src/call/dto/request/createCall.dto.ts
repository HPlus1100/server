import { IsNotEmpty } from 'class-validator';
import { TaxiType } from '../../types/taxi';
import { LocationInfo } from '../response/activeCall/dataDto/locationInfo.dto';

export class CreateCallDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  taxiType: TaxiType;

  @IsNotEmpty()
  departure: LocationInfo;

  @IsNotEmpty()
  arrival: LocationInfo;
}
