import { DataSource, Repository } from 'typeorm';
import { Taxi } from './taxi.entity';
import { newDb } from 'pg-mem';
import { CarType } from './types/taxi.enum';
import { TaxiService } from './taxi.service';
import { TaxiRepository } from '@taxi/taxi.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UpdateTaxiDto } from './dto/update-taxi.dto';
import { NotFoundException } from '@nestjs/common';

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

describe('With pg-mem, Taxi Domain Unit Test', () => {
  let dataSource: DataSource;
  let taxiService: TaxiService;
  let taxiRepository: Repository<Taxi>;

  beforeAll(async () => {
    const db = newDb();

    db.public.registerFunction({
      name: 'current_database',
      implementation: () => 'taxiDB',
    });

    db.public.registerFunction({
      name: 'version',
      implementation: () => '2.7.1',
    });

    dataSource = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: [Taxi],
      database: 'taxiDB',
    });

    await dataSource.initialize();
    await dataSource.synchronize();

    taxiRepository = dataSource.getRepository(Taxi);

    // create sample TaxiInfo
    await taxiRepository
      .create({
        driverNo: 131112345678,
        carType: CarType.NORMAL,
        companyName: 'Hyundai',
        carNum: '68오8269',
        carModel: '쏘나타',
      })
      .save();
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
    await dataSource.destroy();
  });

  it('findAll success case test - taxiService.getAllTaxiInfo', async () => {
    const taxis = await taxiService.getAllTaxiInfo();
    expect(taxis.length).toBe(1);
    expect(taxis[0].companyName).toBe('Hyundai');
  });

  it('findOne success case test - taxiService.getTaxiInfoById', async () => {
    const taxi = await taxiService.getTaxiInfoById(1); //id 1부터 시작...
    expect(taxi.carModel).toBe('쏘나타');
  });

  it('create success case test - taxiService.createTaxiInfo', async () => {
    const taxiInfo = {
      driverNo: 369112332111,
      carType: CarType.NORMAL,
      companyName: 'Tesla',
      carNum: '68허8269',
      carModel: 'Model Y',
    };

    const taxi = await taxiService.createTaxiInfo(taxiInfo);
    expect(taxi.companyName).toBe('Tesla');
  });

  it('update success case test - taxiService.updateTaxiInfoById', async () => {
    const taxi = await taxiService.getTaxiInfoById(1);
    expect(taxi.carModel).toBe('쏘나타');

    delete taxi.no;
    delete taxi.createdAt;

    // TOBO 뭔가 이상함 그냥 plainToClass 안해도 no 같은거 안들어가야할거 같은데 들어감
    const newTaxi = await taxiService.updateTaxiInfoById(
      1,
      plainToClass(UpdateTaxiDto, {
        ...taxi,
        carModel: '아이오닉',
      }),
    );

    expect(newTaxi.carModel).toBe('아이오닉');
  });

  it('remove success case test - taxiService.deleteTaxiInfoById', async () => {
    const taxi = await taxiService.getTaxiInfoById(1);
    expect(taxi.driverNo).toBe(131112345678);

    const oldTaxi = await taxiService.deleteTaxiInfoById(1);
    expect(oldTaxi.driverNo).toBe(131112345678);

    expect(async () => {
      await taxiService.getTaxiInfoById(1);
    }).rejects.toThrowError(NotFoundException);
  });
});
