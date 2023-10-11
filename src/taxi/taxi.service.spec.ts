import { DataSource, Repository } from 'typeorm';
import { Taxi } from './taxi.entity';
import { newDb } from 'pg-mem';
import { CarType } from './types/taxi.enum';
import { TaxiService } from './taxi.service';
import { TaxiRepository } from '@taxi/taxi.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('With pg-mem, TypeORM의 Taxi Repository Test', () => {
  let dataSource: DataSource;
  let taxiService: TaxiService;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Taxi])],
      providers: [TaxiService, TaxiRepository],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    taxiService = module.get<TaxiService>(TaxiService);
  });

  afterAll(async () => {
    await dataSource.close();
  });

  it('to be defined', () => {
    expect(dataSource).toBeDefined();
    expect(taxiRepository).toBeDefined();
  });

  it('create taxi entity test', async () => {
    const createTaxi = await taxiRepository
      .create({
        driverNo: 131112345678,
        carType: CarType.NORMAL,
        companyName: 'Hyundai',
        carNum: '68오8269',
        carModel: '쏘나타',
      })
      .save();

    expect(createTaxi.driverNo).toBe(131112345678);
  });

  it('select taxi entity test', async () => {
    const taxi = await taxiRepository.findOne({ where: { no: 1 } });

    expect(taxi.carNum).toBe('68오8269');
  });

  it('taxi service - getAllTaxiInfo test', async () => {
    const taxis = await taxiService.getAllTaxiInfo();
    expect(taxis.length).toBe(1);
    expect(taxis[0].companyName).toBe('Hyundai');
  });
});
