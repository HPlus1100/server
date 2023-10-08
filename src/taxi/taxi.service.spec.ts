import { Test, TestingModule } from '@nestjs/testing';
import { TaxiService } from './taxi.service';
import { TaxiRepository } from './taxi.repository';
import { DataSource } from 'typeorm';
import { dataSourceMockFactory } from '../../test/mock/dataSourceMockFactory';

describe('TaxiService', () => {
  let service: TaxiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxiService,
        TaxiRepository,
        { provide: DataSource, useFactory: dataSourceMockFactory },
      ],
    }).compile();

    service = module.get<TaxiService>(TaxiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
