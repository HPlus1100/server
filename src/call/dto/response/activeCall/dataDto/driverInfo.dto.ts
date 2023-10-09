import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class DriverInfo {
  @Expose()
  no: string;

  @Expose()
  name: string;

  @Expose()
  phone: `${number}-${number}-${number}`;

  @Expose()
  profileImage: string;
}
