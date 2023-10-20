import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from '@payments/entities/payment.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
});

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        PaymentsService,
        {
          provide: getRepositoryToken(Payment),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    let findAllSpy: jest.SpyInstance;
    describe('when there is no payments', () => {
      it.todo('should return an empty array');
    });
    describe('otherwise', () => {
      beforeEach(() => {
        findAllSpy = jest.spyOn(service, 'findAll');
      });
      afterEach(() => {
        findAllSpy.mockReset();
      });
      it('should return an array of all payments', () => {
        const max = 100;
        const min = 1;
        const range = max - min + 1;
        const numOfPayments = Math.floor(Math.random() * range) + min;
        const mockedPayments = Array.from(
          { length: numOfPayments },
          () => new Payment(),
        );
        findAllSpy.mockReturnValue(mockedPayments);

        const result = controller.findAll();
        expect(result).toEqual(mockedPayments);
      });
    });
  });
  describe('findOne', () => {
    it.todo('should call the service');
  });
  describe('create', () => {
    it.todo('should call the service');
  });
  describe('update', () => {
    it.todo('should call the service');
  });
  describe('remove', () => {
    it.todo('should call the service');
  });
});
