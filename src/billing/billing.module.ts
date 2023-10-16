import { Module } from '@nestjs/common';
import { BillingController } from '@billing/billing.controller';
import { BillingService } from '@billing/billing.service';
import { PaymentRepository } from '@billing/repository/payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from '@billing/domain/entity/billing.entity';
import { DailyEarningsRepository } from '@billing/repository/daily-earning.repository';
import { DailyEarnings } from '@billing/domain/entity/daily-earning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, DailyEarnings])],
  controllers: [BillingController],
  providers: [BillingService, PaymentRepository, DailyEarningsRepository],
  exports: [PaymentRepository, DailyEarningsRepository],
})
@Module({})
export class BillingModule {}
