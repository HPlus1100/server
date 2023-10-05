import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaxiType } from './types/taxi';

@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
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
