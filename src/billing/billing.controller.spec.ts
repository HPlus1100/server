import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from '@billing/billing.controller';
import { BillingService } from '@billing/billing.service';
import { PaymentInfoDto } from '@billing/domain/dto/payment-info.dto';
import { PaymentType } from '@billing/domain/type/billing.enum';
import { PaymentRepository } from '@billing/repository/payment.repository';
import { DailyEarningsRepository } from '@billing/repository/daily-earning.repository';

const createMockRepository = jest.fn(() => ({
  save: jest.fn(),
  getPaymentInfoByUserId: jest.fn(),
  getDailyEarningsForUser: jest.fn(),
  getPaymentInfoByAccountNumber: jest.fn(),
}));

describe('BillingController', () => {
  let controller: BillingController;
  let service: BillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [
        BillingService,
        { provide: PaymentRepository, useValue: createMockRepository() },
        { provide: DailyEarningsRepository, useValue: createMockRepository() },
      ],
    }).compile();

    controller = module.get<BillingController>(
      BillingController,
    ) as BillingController;
    service = module.get<BillingService>(BillingService) as BillingService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('savePaymentInfo-> create', () => {
    let createSpy: jest.SpyInstance;

    beforeEach(() => {
      createSpy = jest.spyOn(service, 'saveUserPaymentInfo');
    });
    afterEach(() => {
      createSpy.mockReset();
    });
    it('should call the service method and return a success string', async () => {
      const mockPaymentInfoDto: PaymentInfoDto = {
        customerNo: '12345',
        type: PaymentType.Card,
        cardNum: '1234567812345678',
        cvc: '123',
        expireDate: '2025-12-01',
        isDefault: true,
        isDeleted: false,
      };
      createSpy.mockReturnValue(mockPaymentInfoDto);

      const result = controller.savePaymentInfo(mockPaymentInfoDto);
      expect(result).toEqual('PaymentInfo save controller');
    });
  });

  describe('selectPaymentInfo by userid', () => {
    let selectSpy: jest.SpyInstance;
    beforeEach(() => {
      selectSpy = jest.spyOn(service, 'getPaymentInfoByUserId');
    });
    afterEach(() => {
      selectSpy.mockReset();
    });

    it('should call the service method and return a success string', async () => {
      const userId = 'testUser';
      const mockServiceResult = userId;

      selectSpy.mockReturnValue(userId);

      const result = controller.selectPaymentInfo(userId);
      expect(result).toEqual(mockServiceResult);
    });
  });

  describe('getEarningsToday -> findOne(ManySelect)', () => {
    let selectSpy: jest.SpyInstance;

    beforeEach(() => {
      selectSpy = jest.spyOn(service, 'getTodayEarnings');
    });
    afterEach(() => {
      selectSpy.mockReset();
    });

    it('should call the service method and return the service result with a welcome message', async () => {
      const userId = 'testUser';
      const earningDate = '2023-10-01,2023-10-02';
      const mockEarnings = {
        userId: 'testUser',
        earningDate: '2023-10-01,2023-10-02',
      };

      selectSpy.mockReturnValue(mockEarnings);

      const result = await controller.getEarningsToday(userId, earningDate);

      expect(result).toEqual(mockEarnings);
    });
  });
});
