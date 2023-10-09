import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entity/customer.entity';
import { CustomerManager } from './component/customer-manager.component';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    { provide: 'CustomerManager', useClass: CustomerManager }
  ]
})
export class CustomerModule {}
