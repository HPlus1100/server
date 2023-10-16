import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentType } from '../type/billing.enum';

@Entity('payment_method')
export class PaymentMethod {
  @PrimaryGeneratedColumn('increment', { name: 'no' })
  no: number;

  @Column({ name: 'customer_no' })
  customerNo: string;

  @Column({
    type: 'enum',
    enum: PaymentType,
    nullable: false,
    comment: 'Account | Card',
    name: 'payment_type',
  })
  type: PaymentType;

  @Column({
    length: 50,
    nullable: true,
  })
  bankName: string;

  @Column({
    length: 50,
    nullable: true,
  })
  accountNumber: string;

  @Column({
    length: 50,
    nullable: true,
  })
  accountHolderName: string;

  @Column({
    length: 50,
    nullable: true,
  })
  cardNum: string;

  @Column({
    length: 3,
    nullable: true,
  })
  cvc: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  expireDate: Date;

  @Column({
    default: false,
    comment: '기본결제수단 여부',
  })
  isDefault: boolean;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
