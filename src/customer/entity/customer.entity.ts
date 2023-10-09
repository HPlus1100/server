import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  no: string;

  @Column({ type: 'bigint', name: 'user_no' })
  userNo: string

  @Column({ type: 'varchar' })
  nickname: string

  @Column({ type: 'varchar'})
  phone: string

  @Column({ type: 'varchar', name: 'profile_img', nullable: true})
  profileImg: string

  @Column({ name: 'is_deleted', default: false})
  isDeleted: boolean

  @CreateDateColumn({ type: 'time with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date

  @UpdateDateColumn({ type: 'time with time zone', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date

  @OneToOne(() => User, (user) => user.customer, { cascade: ['insert']})
  @JoinColumn({ referencedColumnName: 'no', name: 'user_no'})
  user: User
}
