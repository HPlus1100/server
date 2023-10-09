import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { PaymentRepository } from './repository/payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './domain/entity/billing.entity';
import { DailyEarningsRepository } from './repository/daily-earning.repository';
import { DailyEarnings } from './domain/entity/daily-earning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, DailyEarnings])],
  controllers: [BillingController],
  providers: [BillingService, PaymentRepository, DailyEarningsRepository],
  exports: [PaymentRepository, DailyEarningsRepository],
})
@Module({})
export class BillingModule {}
