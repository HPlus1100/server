import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findByUsername(username: string) {
    return username;
  }
}
