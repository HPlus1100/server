import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne() {
    return 'find one';
  }

  findAll() {
    return 'findAll';
  }

  findByUsername(username: string) {
    return username;
  }
}
