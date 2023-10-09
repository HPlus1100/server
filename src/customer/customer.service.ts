import { Inject, Injectable } from '@nestjs/common';
import { CustomerManager } from './component/customer-manager.component';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CustomerManager')
        private customerManager: CustomerManager
    ) {}
    
    
    
}
