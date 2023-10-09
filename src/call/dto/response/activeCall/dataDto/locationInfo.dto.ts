import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LocationInfo {
  @Expose()
  address: string;

  @Expose({ name: 'lat' })
  latitude: number;

  @Expose({ name: 'lng' })
  longitude: number;
}
