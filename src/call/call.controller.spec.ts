import { Test, TestingModule } from '@nestjs/testing';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { CallRepository } from './call.repository';
import { DataSource } from 'typeorm';
import { dataSourceMockFactory } from '../../test/mock/dataSourceMockFactory';

describe('CallController', () => {
  let controller: CallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallController],
      providers: [
        CallService,
        CallRepository,
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();

    controller = module.get<CallController>(CallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
