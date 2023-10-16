import { DataSource, Repository } from 'typeorm';
import { Taxi } from './entities/taxi.entity';
import { newDb } from 'pg-mem';
import { CarType } from './types/taxi.enum';
import { TaxisService } from './taxis.service';
import { TaxiRepository } from '@/taxis/taxi.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UpdateTaxiDto } from './dto/update-taxi.dto';
import { NotFoundException } from '@nestjs/common';

describe('With pg-mem, Taxi Domain Unit Test', () => {
  let dataSource: DataSource;
  let taxiService: TaxisService;
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
        driverLicenseNumber: 131112345678,
        carType: CarType.NORMAL,
        companyName: 'Hyundai',
        licensePlateNumber: '68오8269',
        carModel: '쏘나타',
      })
      .save();

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Taxi])],

      providers: [TaxisService, TaxiRepository],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile();

    taxiService = module.get<TaxisService>(TaxisService);
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
      driverLicenseNumber: 369112332111,
      carType: CarType.NORMAL,
      companyName: 'Tesla',
      licensePlateNumber: '68허8269',
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
    expect(taxi.driverLicenseNumber).toBe(131112345678);

    const oldTaxi = await taxiService.deleteTaxiInfoById(1);
    expect(oldTaxi.driverLicenseNumber).toBe(131112345678);

    expect(async () => {
      await taxiService.getTaxiInfoById(1);
    }).rejects.toThrowError(NotFoundException);
  });
});
