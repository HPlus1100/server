import { DataSource, Repository } from 'typeorm';
import { Billing } from '@billing/domain/entity/billing.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingRepository extends Repository<Billing> {
  constructor(private dataSource: DataSource) {
    super(Billing, dataSource.createEntityManager());
  }
}
