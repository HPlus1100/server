import { Injectable } from '@nestjs/common';
import { Call, CallRecord } from './call.model';
import { v4 as uuid } from 'uuid';
import { CreateCallDto } from './dto/createCall.dto';

@Injectable()
export class CallService {
  private callRecords: CallRecord[] = [];
  private calls: Call[] = [];
  getAllPastCallRecords(): CallRecord[] {
    return this.callRecords;
  }

  createCall(createCallDto: CreateCallDto) {
    const { userId, driverId } = createCallDto;
    const call: Call = {
      id: uuid(),
      userId: userId,
      driverId: driverId,
      createdAt: new Date(),
      estimatedTime: 120,
      estimatedFare: 1000,
    };
    this.calls.push(call);
    return this.calls;
  }

  createCallRecord(): string {
    return 'This action creates a new call record';
  }

  successCall(): string {
    return 'This action returns a success call';
  }
}
