import { Inject, Injectable } from '@nestjs/common';

import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CreateDriverDto } from './dto/request/create-driver.dto';

import { CustomerManagerRepository } from 'src/customer/repository/customer-manager.repository';
import { DriverManagerRepository } from 'src/driver/repository/driver-manager.repository';
import { UserReaderRepository } from 'src/user/repository/user-reader.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserReader')
    private readonly userReader: UserReaderRepository,
    @Inject('CustomerManager')
    private readonly customerManager: CustomerManagerRepository,
    @Inject('DriverManager')
    private readonly driverManager: DriverManagerRepository
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
