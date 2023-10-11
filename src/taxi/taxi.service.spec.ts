import { DataSource, Repository } from 'typeorm';
import { Taxi } from './taxi.entity';
import { newDb } from 'pg-mem';

describe('With pg-mem, TypeORM의 Taxi Repository Test', () => {
  let dataSource: DataSource;
  let taxiRepository: Repository<Taxi>;

  beforeAll(async () => {
    // setting memory database
    const db = newDb();

    //
    db.public.registerFunction({
      name: 'current_database',
      implementation: () => 'test',
    });

    // version 함수 없다고 하여 추가
    db.public.registerFunction({
      name: 'version',
      implementation: () => '2.7.1',
    });

    // createTypeormConnection deprecated되어 createTypeormDataSource 함수 사용
    dataSource = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: [Taxi],
      database: 'test',
    });

    // createTypeormDataSource 함수 사용시 아래와 같이 해줘야한다고 함
    await dataSource.initialize();
    await dataSource.synchronize();

    taxiRepository = dataSource.getRepository(Taxi);
  });

  afterAll(async () => {
    await dataSource.close();
  });

  it('to be defined', () => {
    expect(dataSource).toBeDefined();
    expect(taxiRepository).toBeDefined();
  });
});
