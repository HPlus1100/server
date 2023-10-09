import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('driver')
export class Driver {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  no: string;

  @Column({ type: 'bigint', name: 'user_no'})
  userNo: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  phone: string

  @Column({ type: 'varchar', name: 'profile_img' })
  profileImg: string

  @Column({ name: 'is_deleted', default: false})
  isDeleted: boolean

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt

  @OneToOne(() => User, (user) => user.driver, { cascade: ['insert']})
  @JoinColumn({ referencedColumnName: 'no', name: 'user_no'})
  user: User
}
