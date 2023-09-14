import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Todos')
export class TodosEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
