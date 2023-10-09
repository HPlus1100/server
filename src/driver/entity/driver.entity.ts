import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('driver')
export class Driver {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  no: string;

  @Column({ type: 'bigint', name: 'user_no'})
  userNo: string

  @OneToOne(() => User, (user) => user.driver)
  @JoinColumn({ referencedColumnName: 'no', name: 'user_no'})
  user: User
}
