import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { PaymentRepository } from './repository/payment.repository'; // 레포지토리 경로에 따라 수정 필요
import { DailyEarningsRepository } from './repository/daily-earning.repository'; // 레포지토리 경로에 따라 수정 필요

describe('BillingController', () => {
  let controller: BillingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [
        BillingService,
        { provide: PaymentRepository, useValue: {} },
        { provide: DailyEarningsRepository, useValue: {} }
      ],
    }).compile();

    controller = module.get<BillingController>(BillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});