import { Controller, Get, Post } from '@nestjs/common';
import { CallService } from './call.service';

@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}
  @Get('/records')
  getAllPastCallRecords(): string {
    return this.callService.getAllPastCallRecords();
  }

  @Post('/create')
  createCall(): string {
    return this.callService.createCall();
  }

  @Post('/success')
  successCall(): string {
    return this.callService.successCall();
  }
}
