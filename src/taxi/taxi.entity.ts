import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarType } from './types/taxi.enum';

@Entity('taxi')
export class Taxi extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  no: number;

  @Column({ type: 'bigint', name: 'driver_no', nullable: false })
  driverNo: number;

  @Column({
    type: 'enum',
    enum: CarType,
    nullable: false,
    default: CarType.NORMAL,
    comment: 'NORMAL | LUXURY | DELUXE',
    name: 'car_type',
  })
  type: string;

  @Column({ type: 'varchar', length: 50 })
  company_name: string;

  @Column({ type: 'varchar', length: 50 })
  car_num: string;

  @Column({ type: 'varchar', length: 255 })
  car_model: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'time with time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
