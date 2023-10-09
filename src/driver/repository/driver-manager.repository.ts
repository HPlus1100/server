import { CreateDriverDto } from "src/auth/dto/request/create-driver.dto";

export interface DriverManagerRepository {
    register(createDriverDto: CreateDriverDto): Promise<void>
}