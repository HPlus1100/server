import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CarType, TaxiStatus } from '../types/taxi.enum';

@Entity('taxi')
export class Taxi extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  no: number;

  @Column({ type: 'bigint', name: 'user_no', nullable: false })
  userNo: number;

  // TODO: Taxi Status Entity 로 분리 작업
  @Column({
    type: 'enum',
    enum: TaxiStatus,
    nullable: false,
    default: TaxiStatus.PENDING,
    comment: 'PENDING | COMPLETE | ARRIVED | CANCELLED',
    name: 'taxi_status',
  })
  taxiStatus: TaxiStatus;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'phone',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'profile_img',
    nullable: false,
  })
  profileImg: string;

  @Column({ type: 'bigint', name: 'driver_license_number', nullable: false })
  driverLicenseNumber: number;

  @Column({
    type: 'enum',
    enum: CarType,
    nullable: false,
    default: CarType.NORMAL,
    comment: 'NORMAL | LUXURY | DELUXE',
    name: 'car_type',
  })
  carType: CarType;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'company_name',
    nullable: false,
  })
  companyName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'license_plate_number',
    nullable: false,
  })
  licensePlateNumber: string;

  @Column({ type: 'varchar', length: 255, name: 'car_model', nullable: false })
  carModel: string;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
