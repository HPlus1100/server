import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { CallRepository } from './call.repository';
import { DataSource } from 'typeorm';
import { setupDataSource } from '../../test/util/setupDataSource';
import { Call } from './call.entity';
import { PathApiRepository } from '@/externalApi/path-api.repository';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('CallService', () => {
  let service: CallService;
  let dataSource: DataSource;

  beforeEach(async () => {
    dataSource = await setupDataSource();
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [
        CallService,
        CallRepository,
        PathApiRepository,
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    service = module.get<CallService>(CallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCall', () => {
    it('호출 생성의 결과 값은 Call entity 형태여야 한다.', async () => {
      const call = await service.createCall({
        userId: '1',
        taxiType: 'DELUXE',
        departure: {
          address: '서울 마포구 독막로 266',
          lat: 126.942389642584,
          lng: 37.5438675433938,
        },
        arrival: {
          address: '경기도 성남시 분당구 성남대로 55',
          lat: 127.108947909824,
          lng: 37.3399767000124,
        },
      });

      expect(call).toBeInstanceOf(Call);
    });
  });
});
