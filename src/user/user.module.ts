import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserReader } from './components/user-reader.component';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService, 
    {provide: 'UserReader', useClass: UserReader}
  ],
})
export class UserModule {}
