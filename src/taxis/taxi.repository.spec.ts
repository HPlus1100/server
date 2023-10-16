import { TestingModule, Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { newDb } from 'pg-mem';
import { DataSource, Repository } from 'typeorm';
import { Taxi } from './entities/taxi.entity';
import { TaxiRepository } from './taxi.repository';
import { TaxisService } from './taxis.service';
import { CarType } from './types/taxi.enum';

describe('With pg-mem, TypeORM의 Taxi Repository Test', () => {
  let dataSource: DataSource;
  let taxisService: TaxisService;
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

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Taxi])],
      providers: [TaxisService, TaxiRepository],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    taxisService = module.get<TaxisService>(TaxisService);
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
        driverLicenseNumber: 131112345678,
        carType: CarType.NORMAL,
        companyName: 'Hyundai',
        licensePlateNumber: '68오8269',
        carModel: '쏘나타',
      })
      .save();

    expect(createTaxi.driverLicenseNumber).toBe(131112345678);
  });

  it('select taxi entity test', async () => {
    const taxi = await taxiRepository.findOne({ where: { no: 1 } });

    expect(taxi.licensePlateNumber).toBe('68오8269');
  });

  it('taxi service - getAllTaxiInfo test', async () => {
    const taxis = await taxisService.getAllTaxiInfo();
    expect(taxis.length).toBe(1);
    expect(taxis[0].companyName).toBe('Hyundai');
  });
});
