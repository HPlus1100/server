import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { CallRepository } from './call.repository';
import { DataSource } from 'typeorm';

import { newDb } from 'pg-mem';

//TODO : 독립 setup파일로 빼기
const setupDataSource = async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public
    .registerFunction({
      name: 'current_database',
      implementation: () => 'taxiDB',
    })
    .registerFunction({
      name: 'version',
      implementation: () => '1.0',
    });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
  });
  await ds.initialize();
  await ds.synchronize();

  return ds;
};

describe('CallService', () => {
  let service: CallService;

  beforeEach(async () => {
    const dataSource = await setupDataSource();
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
