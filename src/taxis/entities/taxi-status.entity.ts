import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaxiStatus } from '../types/taxi.enum';

@Entity('taxi-status')
export class Taxi extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  no: number;

  @Column({ type: 'bigint', name: 'taxi_no', nullable: false })
  taxiNo: number;

  @Column({
    type: 'enum',
    enum: TaxiStatus,
    nullable: false,
    default: TaxiStatus.PENDING,
    comment: 'PENDING | COMPLETE | ARRIVED | CANCELLED',
    name: 'taxi_status',
  })
  taxiStatus: TaxiStatus;
}
