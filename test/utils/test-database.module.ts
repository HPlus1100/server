import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/customer/entity/customer.entity";
import { Driver } from "src/driver/entity/driver.entity";
import { User } from "src/user/entity/user.entity";

export const TestDatabaseModule = () => [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Customer, Driver])
]
