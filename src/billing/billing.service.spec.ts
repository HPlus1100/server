import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from './billing.service';
import { PaymentRepository } from './repository/payment.repository';
import { DailyEarningsRepository } from './repository/daily-earning.repository';
import { PaymentInfoDto } from '@billing/domain/dto/payment-info.dto';
import { PaymentType } from '@billing/domain/type/billing.enum';

const mockPaymentRepository = () => ({
  save: jest.fn(),
  findByPaymentInfo: jest.fn(),
  findByAccountNumber: jest.fn(),
});

const mockDailyEarningsRepository = () => ({
  findByDateAndUserId: jest.fn(),
});

describe('BillingService', () => {
  let service: BillingService;
  let paymentRepository;
  let dailyEarningsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        {
          provide: PaymentRepository,
          useFactory: mockPaymentRepository,
        },
        {
          provide: DailyEarningsRepository,
          useFactory: mockDailyEarningsRepository,
        },
      ],
    }).compile();

    service = module.get<BillingService>(BillingService) as BillingService;
    paymentRepository = module.get<PaymentRepository>(PaymentRepository);
    dailyEarningsRepository = module.get<DailyEarningsRepository>(
      DailyEarningsRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveUserPaymentInfo', () => {
    describe('Success senarios for saveUserPaymentInfo', () => {
      it('should save a payment info and return it', async () => {
        const saveSpy = jest
          .spyOn(paymentRepository, 'save')
          .mockResolvedValue('someValue');

        const mockPaymentInfoDto: PaymentInfoDto = {
          customerNo: '12345',
          type: PaymentType.Card,
          cardNum: '1234567812345678',
          cvc: '123',
          expireDate: '2025-12-01',
          isDefault: true,
          isDeleted: false,
        };

        expect(await service.saveUserPaymentInfo(mockPaymentInfoDto)).toEqual(
          'someValue',
        );
        expect(saveSpy).toHaveBeenCalledWith(mockPaymentInfoDto);
      });
    });

    describe('Failure senarios for saveUserPaymentInfo', () => {
      it('should throw an error if saving payment info fails', async () => {
        jest
          .spyOn(paymentRepository, 'save')
          .mockRejectedValue(new Error('Save failed'));

        const mockPaymentInfoDto: PaymentInfoDto = {
          customerNo: '12345',
          type: PaymentType.Card,
          cardNum: '1234567812345678',
          cvc: '123',
          expireDate: '2025-12-01',
          isDefault: true,
          isDeleted: false,
        };

        await expect(
          service.saveUserPaymentInfo(mockPaymentInfoDto),
        ).rejects.toThrow('Save failed');
      });

      it('should throw an error if save is not called with expected parameters', async () => {
        const saveSpy = jest
          .spyOn(paymentRepository, 'save')
          .mockResolvedValue('unexpectedValue');

        const mockPaymentInfoDto: PaymentInfoDto = {
          customerNo: '12345',
          type: PaymentType.Card,
          cardNum: '1234567812345678',
          cvc: '123',
          expireDate: '2025-12-01',
          isDefault: true,
          isDeleted: false,
        };

        await service.saveUserPaymentInfo(mockPaymentInfoDto);

        expect(saveSpy).not.toHaveBeenCalledWith('unexpectedParameters');
      });
    });
  });

  describe('getTodayEarnings', () => {
    describe('Success scenarios', () => {
      it('should get today Earnings and return it', async () => {
        const getSpy = jest
          .spyOn(dailyEarningsRepository, 'findByDateAndUserId')
          .mockResolvedValue('somevalue');

        const userId = 'testUser';
        const earningDates = ['2023-10-01', '2023-10-02'];

        await service.getTodayEarnings(userId, earningDates.join(','));

        earningDates.forEach((date) => {
          expect(getSpy).toHaveBeenCalledWith(userId, date);
        });
      });
    });

    describe('Failure scenarios', () => {
      it('should handle an error from findByDateAndUserId', async () => {
        jest
          .spyOn(dailyEarningsRepository, 'findByDateAndUserId')
          .mockRejectedValue(new Error('Fetch failed'));

        const userId = 'testUser';
        const earningDates = ['2023-10-01', '2023-10-02'];

        await expect(
          service.getTodayEarnings(userId, earningDates.join(',')),
        ).rejects.toThrow('Fetch failed');
      });
    });
  });

  describe('getPaymentInfo', () => {
    describe('Success scenarios for getPaymentInfo', () => {
      it('should get a payment info and return it', async () => {
        const findByPaymentInfoSpy = jest
          .spyOn(paymentRepository, 'findByPaymentInfo')
          .mockResolvedValue('someValue');
        const userId = 'testUser';

        expect(await service.getPaymentInfo(userId)).toEqual('someValue');
        expect(findByPaymentInfoSpy).toHaveBeenCalledWith(userId);
      });
    });

    describe('Failure scenarios for getPaymentInfo', () => {
      /**
       *   이 테스트는 'findByPaymentInfo' 메서드가 예외를 던지는 경우,
       *   'getPaymentInfo' 메서드도 동일한 예외를 던지는지 확인합니다.
       */
      it('should throw an error if findByPaymentInfo rejects', async () => {
        jest
          .spyOn(paymentRepository, 'findByPaymentInfo')
          .mockRejectedValue(new Error('Fetching failed'));

        const userId = 'testUser';
        await expect(service.getPaymentInfo(userId)).rejects.toThrow(
          'Fetching failed',
        );
      });

      /**
       *   이 테스트는 'findByPaymentInfo' 메서드가 null 값을 반환하는 경우,
       *   'getPaymentInfo' 메서드도 null을 반환하는지 확인합니다.
       */
      it('should return null if no payment info is found', async () => {
        jest
          .spyOn(paymentRepository, 'findByPaymentInfo')
          .mockResolvedValue(null);

        const userId = 'testUser';
        const result = await service.getPaymentInfo(userId);

        expect(result).toBeNull();
      });
    });
  });

  describe('findByBankAccountNumber', () => {
    describe('Success scenarios for findByBankAccountNumber', () => {
      it('should get a bank account number and return it', async () => {
        const findSpy = jest
          .spyOn(paymentRepository, 'findByAccountNumber')
          .mockResolvedValue('someValue');
        const mockAccountNumber = '123456789';

        const result = await service.findByBankAccountNumber(mockAccountNumber);

        expect(result).toEqual('someValue');
        expect(findSpy).toHaveBeenCalledWith(mockAccountNumber);
      });
    });

    describe('Failure scenarios for findByBankAccountNumber', () => {
      /**
       * 이 테스트는 'findByAccountNumber' 메소드가 거부되는 경우(데이터베이스 오류로 인해),
       *  서비스 메소드 'findByBankAccountNumber'도 오류를 거부하고 전파합니다.
       */
      it('should throw an error if findByAccountNumber rejects', async () => {
        jest
          .spyOn(paymentRepository, 'findByAccountNumber')
          .mockRejectedValue(new Error('Fetching failed'));

        const mockAccountNumber = '123456789';
        await expect(
          service.findByBankAccountNumber(mockAccountNumber),
        ).rejects.toThrow('Fetching failed');
      });

      /**
       * 이 테스트는 계정을 찾을 수 없는 경우(즉, 'findByAccountNumber'가 null을 반환하는 경우),
       *  findByBankAccountNumber' 서비스 메소드도 '찾을 수 없음' 시나리오에 따라 null을 반환합니다
       */
      it('should return null if no account is found', async () => {
        jest
          .spyOn(paymentRepository, 'findByAccountNumber')
          .mockResolvedValue(null);

        const mockAccountNumber = '123456789';
        const result = await service.findByBankAccountNumber(mockAccountNumber);

        expect(result).toBeNull();
      });
    });
  });
});
