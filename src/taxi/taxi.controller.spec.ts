import { Test, TestingModule } from '@nestjs/testing';
import { TaxiController } from './taxi.controller';
import { TaxiService } from './taxi.service';
import { TaxiRepository } from './taxi.repository';
import { DataSource } from 'typeorm';
import { dataSourceMockFactory } from '../../test/mock/dataSourceMockFactory';

describe('TaxiController', () => {
  let controller: TaxiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxiController],
      providers: [
        TaxiService,
        TaxiRepository,
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();

    controller = module.get<TaxiController>(TaxiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
