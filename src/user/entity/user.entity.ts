import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Driver } from '../../driver/entity/driver.entity';
import { Customer } from '../../customer/entity/customer.entity';
import * as bcrypt from 'bcrypt'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  no: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type : 'timestamp with time zone', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date

  @OneToOne(() => Driver, (driver) => driver.user)
  driver?: Driver

  @OneToOne(() => Customer, (customer) => customer.user)
  customer?: Customer

  public async transformPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(
      password, 10,
    );
  
    return hashPassword
  }
  
}
