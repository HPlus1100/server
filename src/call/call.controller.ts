import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CallService } from './call.service';
import { CreateCallDto, TerminateCallDto } from './dto/request';
import { ActiveCallForDriverDto } from './dto/response';
import { CallValidationPipe } from './pipes/callValidation.pipe';
import { Call } from './call.entity';
import { TerminateCallValidationPipe } from './pipes/terminateCallValidation.pipe';
import { ActiveCallForCustomerDto } from './dto/response/activeCall/activeCallForCustomer.dto';
import { CircuitBreakerInterceptor } from './circuit-breaker/circuit-breaker.interceptor';

@UseInterceptors(CircuitBreakerInterceptor)
@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get('/active/customer/:id')
  async getActiveCallByCustomerId(
    @Param('id') customerId: string,
  ): Promise<ActiveCallForCustomerDto> {
    return await this.callService.getActiveCallByCustomerId(customerId);
  }

  @Post('/')
  createCall(
    @Body(CallValidationPipe) createCallDto: CreateCallDto,
  ): Promise<Call> {
    return this.callService.createCall(createCallDto);
  }

  @Post('/:callId/terminate')
  async terminateCall(
    @Param('callId') callId: string,
    @Body(TerminateCallValidationPipe) terminateCallDto: TerminateCallDto,
  ): Promise<boolean> {
    // 종료 시간, 요금 받아야지
    return await this.callService.terminateCall(callId, terminateCallDto);
  }

  @Get('/active/driver/:id')
  async getActiveCallByDriverId(
    @Param('id') driverId: string,
  ): Promise<ActiveCallForDriverDto> {
    return await this.callService.getActiveCallByDriverId(driverId);
  }

  // @Get('/')
  // getAllCalls(): Promise<Call[]> {
  //   return this.callService.getAllCalls();
  // }

  // @Get('/:id')
  // getCallsByUserId(@Param('id') userId: string): Promise<Call[]> {
  //   return this.callService.getCallsByUserId(userId);
  // }

  // @Delete('/:id')
  // deleteCallByUserId(@Param('id') id: string) {
  //   return this.callService.deleteCallsByUserId(id);
  // }
}
