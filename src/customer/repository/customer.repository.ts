import { CreateCustomerDto } from "src/customer/dto/create-customer.dto";


export interface CustomerRepository {
    save(createCustomerDto: CreateCustomerDto): Promise<void>   
    findAll(): Promise<void>
}
