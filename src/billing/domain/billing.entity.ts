import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('Billing')
export class Billing extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  billingNo: string;

  @Column('numeric', { nullable: false })
  amount: number;
  
  // customer: Customer; ManyToOne관계
  // driver: Driver; ManyToOne관계
  
  @Column('bigint', { nullable: true })
  distance: number;

  @Column({
    type: 'enum',
    enum: BillingStatus,
    default: BillingStatus.PENDING,
    comment: '결제상태',
  })
  status: BillingStatus;
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date;
  
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedTime: Date;
}


export enum BillingStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}