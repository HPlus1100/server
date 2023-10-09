import { Inject, Injectable } from '@nestjs/common';

import { CustomerManager } from 'src/customer/component/command/customer-manager.component';
import { UserReader } from 'src/user/components/query/user-reader.component';

import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserReader')
    private readonly userReader: UserReader,
    @Inject('CustomerManager')
    private readonly customerManager: CustomerManager
  ) {}

  validateUser(email: string, password: string): Promise<boolean> {  
    return this.userReader.validateUser(email, password)
  }

  async signupCustomer(createCustomerDto: CreateCustomerDto): Promise<void> {
    await this.customerManager.save(createCustomerDto)

    return
  }
}
