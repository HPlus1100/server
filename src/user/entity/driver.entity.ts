import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('driver')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  no: string;
}
