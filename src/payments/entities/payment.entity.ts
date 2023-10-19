import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  no: string;
}
