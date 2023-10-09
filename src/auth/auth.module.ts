import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserReader } from 'src/user/components/user-reader.component';
import { CustomerManager } from 'src/customer/component/customer-manager.component';
import { CustomerModule } from 'src/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Customer } from 'src/customer/entity/customer.entity';
import { LocalStrategy } from './security/local.strategy';
import { Driver } from 'src/driver/entity/driver.entity';
import { DriverManager } from 'src/driver/component/driver-manager.component';

@Module({
  imports: [
    UserModule, 
    CustomerModule,
    TypeOrmModule.forFeature([User, Customer, Driver])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LocalStrategy,
    { provide: 'UserReader', useClass: UserReader }, 
    { provide: 'CustomerManager', useClass: CustomerManager },
    { provide: 'DriverManager', useClass: DriverManager }
  ],
})
export class AuthModule {}
