import { User } from "../entity/user.entity";

export interface UserRepository {
    existsEmail(email: string): Promise<boolean>
    validateUser(email: string, password: string): Promise<boolean>
    findOneByEmail(email: string): Promise<User>
}

