import { TaxiType } from '@/call/types/taxi';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TaxiInfo {
  @Expose()
  no: string;

  @Expose()
  carNum: string;

  @Expose()
  type: TaxiType;
}
