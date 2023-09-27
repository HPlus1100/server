import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  no: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
