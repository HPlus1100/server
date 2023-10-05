import {
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCallDto } from './dto/createCall.dto';
import { CallRepository } from './call.repository';
import { Call } from './call.entity';

@Injectable()
export class CallService {
  constructor(private callRepository: CallRepository) {}

  @UsePipes(ValidationPipe)
  async getAllCalls(): Promise<Call[]> {
    return await this.callRepository.find();
  }

  @UsePipes(ValidationPipe)
  async getCallsByUserId(userId: string): Promise<Call[]> {
    const found = await this.callRepository.find({
      where: {
        userId: userId,
      },
    });
    if (!found) {
      throw new NotFoundException(`Can't find user with userId ${userId}`);
    }
    return found;
  }

  async createCall(createCallDto: CreateCallDto): Promise<Call> {
    const { userId, taxiType } = createCallDto;
    const call = this.callRepository.create({
      userId: userId,
      taxiType: taxiType,
      createdAt: new Date(),
      estimatedTime: 120,
      estimatedFare: 1000,
    });
    await this.callRepository.save(call);
    return call;
  }

  async deleteCallsByUserId(userId: string): Promise<string> {
    const result = await this.callRepository.delete({ userId: userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find user with id ${userId}`);
    }
    return `Delete user with id ${userId}`;
  }

  // createCallRecord(): string {
  //   return 'This action creates a new call record';
  // }
}
