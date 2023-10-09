import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { Customer } from "src/customer/entity/customer.entity";

import { CreateCustomerDto } from "src/customer/dto/create-customer.dto";

import { CustomerManagerRepository } from "src/customer/repository/customer-manager.repository"; 
import { User } from "src/user/entity/user.entity";


@Injectable()
export class CustomerManager implements CustomerManagerRepository{
    constructor(
    @InjectRepository(Customer)
       private customerRepository: Repository<Customer>
    ) {}

    async register(createCustomerDto: CreateCustomerDto): Promise<void> {
        const { email, password, nickname, phone, profileImg } = createCustomerDto

        const user = new User()
        user.email = email
        user.password = await user.transformPassword(password)
        
        const customer = new Customer()
        customer.nickname = nickname
        customer.phone = phone
        customer.profileImg = profileImg
        customer.user = user
        
        await this.customerRepository.save(customer)
        return
    }
    
}