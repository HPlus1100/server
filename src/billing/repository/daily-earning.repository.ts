import { DataSource, Repository } from 'typeorm';
import { DailyEarnings } from '@billing/domain/entity/daily-earning.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DailyEarningsRepository extends Repository<DailyEarnings> {
  constructor(private dataSource: DataSource) {
    super(DailyEarnings, dataSource.createEntityManager());
  }

  getDailyEarningsForUser(
    userId: DailyEarnings['dailyEarningNo'],
    earningDate: DailyEarnings['earningDate'],
  ): Promise<DailyEarnings[]> {
    return this.createQueryBuilder('daily_earnings')
      .where('daily_earnings.driver = :userId', { userId })
      .andWhere('daily_earnings.earning_date = :earningDate', { earningDate })
      .getMany();
  }
}
