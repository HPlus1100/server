import { Inject, Injectable } from '@nestjs/common';

import { CustomerManager } from 'src/customer/component/customer-manager.component';
import { UserReader } from 'src/user/components/user-reader.component';

import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CreateDriverDto } from './dto/request/create-driver.dto';
import { DriverManager } from 'src/driver/component/driver-manager.component';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserReader')
    private readonly userReader: UserReader,
    @Inject('CustomerManager')
    private readonly customerManager: CustomerManager,
    @Inject('DriverManager')
    private readonly driverManager: DriverManager
  ) {}

  validateUser(email: string, password: string): Promise<boolean> {  
    return this.userReader.validateUser(email, password)
  }

  async signupCustomer(createCustomerDto: CreateCustomerDto): Promise<void> {
    const { email } = createCustomerDto
    await this.userReader.existsEmail(email)
    return await this.customerManager.register(createCustomerDto)
  }

  async signupDriver(createDriverDto: CreateDriverDto): Promise<void> {
    const { email } = createDriverDto
    await this.userReader.existsEmail(email)
    return await this.driverManager.register(createDriverDto)
  }

}
