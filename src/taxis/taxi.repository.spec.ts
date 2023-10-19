import { newDb } from 'pg-mem';
import { DataSource, Repository } from 'typeorm';
import { Taxi } from './entities/taxi.entity';
import { CarType, TaxiStatus } from './types/taxi.enum';

describe('With pg-mem, TypeORM의 Taxi Repository Test', () => {
  let dataSource: DataSource;
  let taxiRepository: Repository<Taxi>;

  beforeAll(async () => {
    // setting memory database
    const db = newDb();

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
    // await dataSource.close(); // deprecated
    await dataSource.destroy();
  });

  it('to be defined', () => {
    expect(dataSource).toBeDefined();
    expect(taxiRepository).toBeDefined();
  });

  it('create taxi entity test', async () => {
    const createTaxi = await taxiRepository
      .create({
        userNo: 1,
        taxiStatus: TaxiStatus.AVAILABLE,
        name: '김태훈',
        phone: '010-1234-5678',
        driverLicenseNumber: 131112345678,
        carType: CarType.NORMAL,
        companyName: 'Hyundai',
        licensePlateNumber: '68오8269',
        carModel: '쏘나타',
      })
      .save();

    expect(createTaxi.driverLicenseNumber).toBe(131112345678);
  });
});
