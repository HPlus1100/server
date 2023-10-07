import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TerminateCallDto } from '../dto/request/terminateCall.dto';

export class TerminateCallValidationPipe implements PipeTransform {
  transform(value: TerminateCallDto) {
    if (!this.isTimeValid(value.arrivalTime)) {
      throw new BadRequestException(
        `"${value.arrivalTime}" is an invalid arrival time`,
      );
    }
    return value;
  }

  private isTimeValid(arrivalTime: Date) {
    const now = new Date(Date.now());
    const arrival = new Date(arrivalTime);

    //시간이 현재시간보다 앞서거나, 어제보다 뒤인 경우 error throw
    if (
      now.getTime() < arrival.getTime() ||
      arrival.getTime() < now.getTime() - 1
    )
      return false;
    else {
      return true;
    }
  }
}
