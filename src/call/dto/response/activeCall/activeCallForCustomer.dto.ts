import { Exclude, Expose, Type } from 'class-transformer';
import { DriverInfo } from './dataDto/driverInfo.dto';
import { ValidateNested } from 'class-validator';
import { TaxiInfo } from './dataDto/taxiInfo.dto';
import { LocationInfo } from './dataDto/locationInfo.dto';

@Exclude()
export class ActiveCallForCustomerDto {
  @ValidateNested()
  @Type(() => TaxiInfo)
  @Expose()
  taxiInfo: TaxiInfo;

  @ValidateNested()
  @Type(() => DriverInfo)
  @Expose()
  driverInfo: DriverInfo;

  @Expose()
  matchingTime: Date;

  @ValidateNested()
  @Type(() => LocationInfo)
  @Expose()
  departure: LocationInfo;

  @ValidateNested()
  @Type(() => LocationInfo)
  @Expose()
  arrival: LocationInfo;
}
