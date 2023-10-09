import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from './billing.service';
import { PaymentRepository } from './repository/payment.repository';
import { DailyEarningsRepository } from './repository/daily-earning.repository';

describe('BillingService', () => {
  let service: BillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        { provide: PaymentRepository, useValue: {} },
        { provide: DailyEarningsRepository, useValue: {} },
      ],
    }).compile();

    service = module.get<BillingService>(BillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
