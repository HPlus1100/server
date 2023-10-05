import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { CallStatus, TaxiInfo } from './types/taxi';

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Call extends BaseEntity {
  // typeorm 권장사항
  @PrimaryGeneratedColumn({ type: 'bigint' })
  no: string;

  @Column()
  status: CallStatus;

  @Column({ type: 'bigint' })
  customerNo: string;

  @Column()
  taxi: TaxiInfo;

  @Column()
  departure: Location;

  @Column()
  arrival: Location;

  @Column()
  fare: number;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column()
  matchingTime: Date;

  @Column()
  createdAt: Timestamp;

  @Column()
  updatedAt: Timestamp;
}
