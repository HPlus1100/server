import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserReader } from 'src/user/components/query/user-reader.component';
import { CustomerManager } from 'src/customer/component/command/customer-manager.component';
import { CustomerModule } from 'src/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Customer } from 'src/customer/entity/customer.entity';

@Module({
  imports: [
    UserModule, 
    CustomerModule,
    TypeOrmModule.forFeature([User, Customer])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    { provide: 'UserReader', useClass: UserReader }, 
    { provide: 'CustomerManager', useClass: CustomerManager }
  ],
})
export class AuthModule {}
