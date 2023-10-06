import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Taxi')
export class Taxi extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driver_no: number;

  @Column()
  type: string;

  @Column()
  company_name: string;

  @Column()
  car_num: string;
}
