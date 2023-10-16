import { DataSource, Repository } from 'typeorm';
import { Taxi } from './entities/taxi.entity';
import { newDb } from 'pg-mem';
import { CarType } from './types/taxi.enum';
import { TaxisService } from './taxis.service';
import { TaxiRepository } from './taxi.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateTaxiDto } from './dto/update-taxi.dto';

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
        userNo: 1,
        name: '김태훈',
        phone: '010-1234-5678',
        profileImg: 'imgUrl',
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

  it('findAll success case test', async () => {
    const taxis = await taxiService.findAll();
    expect(taxis.length).toBe(1);
    expect(taxis[0].companyName).toBe('Hyundai');
  });

  it('findOne success case test', async () => {
    const taxi = await taxiService.findOne(1); //id 1부터 시작...
    expect(taxi.carModel).toBe('쏘나타');
  });

  it('create success case test', async () => {
    const taxiInfo = {
      userNo: 1,
      name: '김태훈',
      phone: '010-1234-5678',
      profileImg: 'imgUrl',
      driverLicenseNumber: 369112332111,
      carType: CarType.NORMAL,
      companyName: 'Tesla',
      licensePlateNumber: '68허8269',
      carModel: 'Model Y',
    };

    const taxi = await taxiService.create(taxiInfo);
    expect(taxi.companyName).toBe('Tesla');
  });

  it('update success case test', async () => {
    const taxi = await taxiService.findOne(1);
    expect(taxi.carModel).toBe('쏘나타');

    // TODO delete 처리 안하고 updateTaxiDto에 넣는 방법 찾기
    delete taxi.no;
    delete taxi.updatedAt;
    delete taxi.createdAt;

    const updateTaxiDto: UpdateTaxiDto = {
      ...taxi,
      carModel: '아이오닉',
    };

    const newTaxi = await taxiService.update(1, updateTaxiDto);

    expect(newTaxi.carModel).toBe('아이오닉');
  });

  it('remove success case test - taxiService.deleteTaxiInfoById', async () => {
    const taxi = await taxiService.findOne(1);
    expect(taxi.driverLicenseNumber).toBe(131112345678);

    const oldTaxi = await taxiService.remove(1);
    expect(oldTaxi.driverLicenseNumber).toBe(131112345678);

    expect(async () => {
      await taxiService.findOne(1);
    }).rejects.toThrowError(NotFoundException);
  });
});
