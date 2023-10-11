import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { AuthService } from './auth.service';
import { CustomerManager } from 'src/customer/component/customer-manager.component';
import { DriverManager } from 'src/driver/component/driver-manager.component';
import { UserReader } from 'src/user/components/user-reader.component';

import { TestDatabaseModule } from 'test/utils/test-database.module';
import { setupDataSource } from 'test/utils/setupDataSource';

describe('AuthService', () => {
  let service: AuthService;
  let dataSource: DataSource

  beforeEach(async () => {
    dataSource = await setupDataSource();
    const module: TestingModule = await Test.createTestingModule({
      imports: TestDatabaseModule(),
      providers: [
        AuthService,
        {provide: "UserReader", useClass: UserReader},
        {provide: "CustomerManager", useClass: CustomerManager},
        {provide: "DriverManager", useClass: DriverManager}
      ],
    })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
