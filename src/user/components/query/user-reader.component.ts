import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entity/user.entity";
import { UserRepository } from "src/user/repository/user.repository";
import { Repository } from "typeorm";


@Injectable()
export class UserReader implements UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<UserRepository>
    ) {
        
    }

    async existsEmail(email: string): Promise<boolean> {
        const existsUserByEmail = await this.findOneByEmail(email)
        
        if(existsUserByEmail) {
            throw new ConflictException('이미 존재하는 이메일 입니다.')
        }

        return true
    }

    async validateUser(email: string, password: string): Promise<boolean> {
        const user = await this.findOneByEmail(email)

        if(!user.transformPassword(password)) {
            throw new BadRequestException('비밀번호가 일치하지 않습니다.')
        }

        return true
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.findOneByEmail(email)

        if(!user) {
            throw new NotFoundException('존재하지 않는 이메일입니다.')
        }

        return user
    }
}