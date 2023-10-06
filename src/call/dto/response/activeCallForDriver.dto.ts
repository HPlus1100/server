import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ActiveCallForDriverDto {
  @Expose()
  customerNo: string;
  @Expose()
  nickname: string;
  @Expose()
  phone: `${number}-${number}-${number}`;
}
