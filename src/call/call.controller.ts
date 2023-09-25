import { Controller, Get, Post } from '@nestjs/common';
// import { CallService } from './call.service';

@Controller('call')
export class CallController {
  //   constructor(private readonly callService: CallService) {}
  @Get('/records')
  getAllPastCallRecords(): string {
    // return this.callService.getAllPastCallRecords();
    return 'This action returns all calls matched before';
  }

  @Post('/create')
  createCall(): string {
    return 'This action creates a new call';
  }

  @Post('/success')
  successCall(): string {
    return 'This action returns a success call';
  }
}
