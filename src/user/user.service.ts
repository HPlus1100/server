import { Inject, Injectable } from '@nestjs/common';
import { UserReader } from './components/query/user-reader.component';

@Injectable()
export class UserService {
  
  constructor(
    @Inject('UserReader')
    private userReader: UserReader
  ) {}

  findOne() {
    return 'find one';
  }

  findAll() {
    return 'findAll';
  }

  findOneByEmail() {
    return 'asd'
  }
}
