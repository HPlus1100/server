import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CallStatus, TaxiInfo } from './types/taxi';
import { UserLocation } from './types/location';

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

  @Column({ type: 'jsonb' })
  taxi: TaxiInfo;

  @Column({ type: 'jsonb' })
  departure: UserLocation;

  @Column({ type: 'jsonb' })
  arrival: UserLocation;

  @Column()
  fare: number;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  matchingTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
