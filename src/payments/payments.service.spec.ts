import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payment } from '@payments/entities/payment.entity';
import { DataSource, Repository } from 'typeorm';
import { PaymentRepository } from '@payments/payment.repository';

type MockRepository<T = unknown> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

class MockRepositoryFactory {
  static getMockRepository<T>(
    type: new (...args: unknown[]) => T,
  ): MockRepository<T> {
    const mockRepository: MockRepository<T> = {};

    Object.getOwnPropertyNames(Repository.prototype)
      .filter((key: string) => key !== 'constructor')
      .forEach((key: string) => {
        mockRepository[key] = jest.fn();
      });

    Object.getOwnPropertyNames(type.prototype)
      .filter((key: string) => key !== 'constructor')
      .forEach((key: string) => {
        mockRepository[key] = type.prototype[key];
      });

    return mockRepository;
  }
}

const mockPaymentRepository =
  MockRepositoryFactory.getMockRepository(PaymentRepository);

describe('PaymentsService', () => {
  let service: PaymentsService;
  let paymentRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Payment),
          useValue: mockPaymentRepository,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    paymentRepository = module.get<MockRepository>(getRepositoryToken(Payment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    describe('when getting all payments', () => {
      it('should return an array of payments', async () => {
        const want: Payment[] = [new Payment(), new Payment(), new Payment()];
        paymentRepository.find.mockReturnValue(want);
        const got = await service.findAll();

        expect(got).toEqual(want);
      });
    });
  });
  describe('findOne', () => {
    describe('', () => {
      it.todo('should return a payment');
    });
  });
  describe('create', () => {
    describe('when creating a payment', () => {
      it.todo('should return the created payment id');
    });
  });
  describe('update', () => {
    describe('when updating a payment', () => {
      it.todo('should return true if the payment is updated');
    });
  });
  describe('remove', () => {
    describe('when removing a payment', () => {
      it.todo('should return true if the payment is removed');
    });
  });
});
