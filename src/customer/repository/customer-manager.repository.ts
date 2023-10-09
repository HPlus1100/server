import { CreateCustomerDto } from "../dto/create-customer.dto"

export interface CustomerManagerRepository {
    save(createCustomerDto: CreateCustomerDto): Promise<void>
}