import { Injectable } from '@nestjs/common';

@Injectable()
export class CallService {
  getAllPastCallRecords(): string {
    return 'This action returns all calls matched before';
  }

  createCall(): string {
    return 'This action creates a new call';
  }

  successCall(): string {
    return 'This action returns a success call';
  }
}
