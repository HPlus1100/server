import { Body, Controller, Post } from '@nestjs/common';
import { CallService } from './call.service';
import { CreateCallDto } from './dto/createCall.dto';
import { CallValidationPipe } from './pipes/callValidation.pipe';
import { Call } from './call.entity';

@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Post('/')
  createCall(
    @Body(CallValidationPipe) createCallDto: CreateCallDto,
  ): Promise<Call> {
    /**
     * 1. Controller, DTO
     * DTO가 어떻게 될까?
     * {유저 id, 택시 종류}가 있어야 겠지?
     *
     * 2-1. Service 1
     * 택시 종류에 맞는 대기자 리스트를 호출 해야한다.
     * 택시 리스트 호출(Req Param : 택시 종류)
     * 호출 동작은 Component 레이어에서 해야겠다.
     * 받아올 값은 뭐지?
     * 택시 정보 리스트
     *
     * 2-2. Service 2
     * 유저 정보 가져오자.(기사님께 넘겨주기 위함)
     *
     *
     * 2-3. Service 3
     * 택시 리스트를 받아왔으면, 택시 리스트를 어떻게 정렬할까?
     * 나와 가장 가까운 택시를 먼저 보여줘야겠다.(일단 정렬은 신경쓰지마!)
     *
     *
     * 3. Service 2
     * 택시 가 매칭 되면 매칭 정보를 어디에 저장해야겠다.
     * 저장에 대한 Component가 필요하다.
     * jsonb 타입으로 저장
     *
     * 4. return
     * 매칭이 되었으면, 매칭 정보를 리턴해주자.
     */
    return this.callService.createCall(createCallDto);
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
