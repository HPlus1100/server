import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { UserService } from './user.service';
import { UserReader } from './components/user-reader.component';

import { setupDataSource } from 'test/utils/setupDataSource';
import { TestDatabaseModule } from 'test/utils/test-database.module';


describe('UserService', () => {
  let service: UserService;
  let dataSource: DataSource
  
  beforeEach(async () => {
    dataSource = await setupDataSource()
    const module: TestingModule = await Test.createTestingModule({
      imports: TestDatabaseModule(),
      providers: [UserService,{provide: "UserReader", useClass: UserReader},],
    })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
