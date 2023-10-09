import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from './billing.service';
import { PaymentRepository } from './repository/payment.repository'; // 레포지토리 경로에 따라 수정 필요
import { DailyEarningsRepository } from './repository/daily-earning.repository'; // 레포지토리 경로에 따라 수정 필요

describe('BillingService', () => {
  let service: BillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        { provide: PaymentRepository, useValue: {} },
        { provide: DailyEarningsRepository, useValue: {} }
      ],
    }).compile();

    service = module.get<BillingService>(BillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
