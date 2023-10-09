import { Exclude, Expose, Type } from 'class-transformer';
import { LocationInfo } from './dataDto/locationInfo.dto';
import { ValidateNested } from 'class-validator';

@Exclude()
export class ActiveCallForDriverDto {
  @Expose()
  customerNo: string;

  @Expose()
  nickname: string;

  @Expose()
  phone: `${number}-${number}-${number}`;

  @ValidateNested()
  @Type(() => LocationInfo)
  @Expose()
  departure: LocationInfo;

  @ValidateNested()
  @Type(() => LocationInfo)
  @Expose()
  arrival: LocationInfo;
}
