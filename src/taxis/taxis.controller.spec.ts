import { Test, TestingModule } from '@nestjs/testing';
import { TaxisController } from './taxis.controller';
import { TaxisService } from './taxis.service';
import { TaxiRepository } from './taxi.repository';
import { DataSource } from 'typeorm';
import { dataSourceMockFactory } from '../../test/mock/dataSourceMockFactory';

describe('TaxisController', () => {
  let controller: TaxisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxisController],
      providers: [
        TaxisService,
        TaxiRepository,
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();

    controller = module.get<TaxisController>(TaxisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
