import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LocationInfo {
  @Expose()
  address: string;

  @Expose()
  lat: number;

  @Expose()
  lng: number;
}
