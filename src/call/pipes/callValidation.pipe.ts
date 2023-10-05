import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaxiType } from '../types/taxi';

export class CallValidationPipe implements PipeTransform {
  readonly TaxiTypes: Array<TaxiType> = ['regular', 'blue', 'black'];

  transform(value) {
    if (!this.isTaxiTypeValid(value.taxiType)) {
      throw new BadRequestException(
        `"${value.taxiType}" is an invalid taxi type`,
      );
    }
    return value;
  }

  private isTaxiTypeValid(type) {
    const idx = this.TaxiTypes.indexOf(type);
    return idx !== -1;
  }
}
