import { Inject, Injectable } from '@nestjs/common';
import { CustomerManager } from './component/command/customer-manager.component';
import { CreateCustomerDto } from './dto/create-customer.dto';


@Injectable()
export class CustomerService {
    constructor(
        @Inject('CustomerManager')
        private customerManager: CustomerManager
    ) {}
    
    createCustomer(createCustomerDto: CreateCustomerDto) {
        return this.customerManager.save(createCustomerDto)
    }
    
}
