import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    describe('when getting all payments', () => {
      it.todo('should return an array of payments');
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
