import { Injectable } from '@nestjs/common';
import { CallRecord } from './call.model';

@Injectable()
export class CallService {
  private callRecords: CallRecord[] = [];
  getAllPastCallRecords(): CallRecord[] {
    return this.callRecords;
  }

  createCall(): string {
    return 'This action creates a new call';
  }

  successCall(): string {
    return 'This action returns a success call';
  }
}
