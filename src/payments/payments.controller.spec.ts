import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it.todo('should call the service');
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
