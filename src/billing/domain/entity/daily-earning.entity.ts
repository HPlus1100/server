import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('daily_earnings')
export class DailyEarnings {
  @PrimaryGeneratedColumn('increment', { name: 'daily_earning_no' })
  dailyEarningNo: string;

  @Column({})
  driver: string; //추후에 Driver Entity class ManyToOne relation

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    name: 'earning_date',
  })
  earningDate: string;

  @Column({
    type: 'numeric',
    default: 0,
    nullable: false,
  })
  amount: number;
}
