import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { CallRepository } from './call.repository';
import { DataSource } from 'typeorm';
import { dataSourceMockFactory } from '../../test/mock/dataSourceMockFactory';

describe('CallService', () => {
  let service: CallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallService,
        CallRepository,
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();

    service = module.get<CallService>(CallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
