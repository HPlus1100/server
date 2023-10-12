import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { CallRepository } from './call.repository';
import { DataSource } from 'typeorm';
import { setupDataSource } from '../../test/util/setupDataSource';

describe('CallService', () => {
  let service: CallService;
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = await setupDataSource();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallService,
        CallRepository,
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    service = module.get<CallService>(CallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCall', () => {
    it('call은 유저 아이디 1을 가지고 있다.', async () => {
      const call = await service.createCall({
        userId: '1',
        taxiType: 'DELUXE',
      });

      expect(call.customerNo).toBe('1');
    });
  });
});
