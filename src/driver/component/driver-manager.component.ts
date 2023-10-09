import { DriverManagerRepository } from "../repository/driver-manager.repository";
import { CreateDriverDto } from "src/auth/dto/request/create-driver.dto";
import { User } from "src/user/entity/user.entity";
import { Driver } from "../entity/driver.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class DriverManager implements DriverManagerRepository {
    constructor(
        @InjectRepository(Driver)
        private driverManagerRepository: Repository<Driver>
    ) {}

    async register(createDriverDto: CreateDriverDto): Promise<void> {
        const {email, password, name, phone, profileImg} = createDriverDto

        const user = new User()
        user.email = email
        user.password = await user.transformPassword(password)

        const driver = new Driver()
        driver.name = name
        driver.phone = phone
        driver.profileImg = profileImg
        driver.user= user

        await this.driverManagerRepository.save(driver)
        return   
    }
}