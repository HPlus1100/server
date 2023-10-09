import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillingStatus } from '../type/billing.enum';

@Entity('billing')
export class Billing extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'billing_no' })
  billingNo: number;

  @Column('numeric', { nullable: false })
  amount: number;

  @Column()
  customer: string; // customer: Customer; ManyToOne관계

  @Column()
  driver: string; // driver: Driver; ManyToOne관계

  @Column({
    type: 'enum',
    enum: BillingStatus,
    default: BillingStatus.PENDING,
    comment: '결제상태',
    name: 'billing_status',
  })
  status: BillingStatus;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdTime: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedTime: Date;
}
