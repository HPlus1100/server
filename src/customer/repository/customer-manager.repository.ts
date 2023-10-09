import { CreateCustomerDto } from "../dto/create-customer.dto"

export interface CustomerManagerRepository {
    register(createCustomerDto: CreateCustomerDto): Promise<void>
}