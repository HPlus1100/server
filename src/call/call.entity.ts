import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaxiType } from './types/taxi';

export class Call extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  taxiType: TaxiType;

  @Column()
  createdAt: Date;

  @Column()
  estimatedTime: number;

  @Column()
  estimatedFare: number;
}
