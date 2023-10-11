import { User } from "../entity/user.entity";

export interface UserReaderRepository {
    existsEmail(email: string): Promise<boolean>
    validateUser(email: string, password: string): Promise<boolean>
    findOneByEmail(email: string): Promise<User>
}

