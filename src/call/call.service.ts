import { Injectable, NotFoundException } from '@nestjs/common';
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

  getAllCalls() {
    return this.calls;
  }
  getCallsByUserId(id: string) {
    const found = this.calls.find((call) => call.userId === id);
    if (!found) {
      throw new NotFoundException(`Can't find user with id ${id}`);
    }
    return found;
  }

  createCall(createCallDto: CreateCallDto) {
    const { userId, taxiType } = createCallDto;
    const call: Call = {
      id: uuid(),
      userId: userId,
      taxiType: taxiType,
      createdAt: new Date(),
      estimatedTime: 120,
      estimatedFare: 1000,
    };
    this.calls.push(call);
    return this.calls;
  }

  deleteCallByUserId(id: string) {
    const found = this.getCallsByUserId(id);
    if (!found) {
      throw new NotFoundException(`Can't find user with id ${id}`);
    }
    this.calls = this.calls.filter((call) => call.userId !== found.userId);

    return `Delete user with id ${id}`;
  }

  createCallRecord(): string {
    return 'This action creates a new call record';
  }

  successCall(): string {
    return 'This action returns a success call';
  }
}
