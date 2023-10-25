import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaxiType } from '../types/taxi';

export class CallValidationPipe implements PipeTransform {
  readonly TaxiTypes: Array<TaxiType> = ['NORMAL', 'LUXURY', 'DELUXE'];

  transform(value: { taxiType: string }): { taxiType: TaxiType } {
    const taxiType = value.taxiType.toUpperCase() as TaxiType;
    if (!this.isTaxiTypeValid(taxiType)) {
      throw new BadRequestException(`"${taxiType}" is an invalid taxi type`);
    }
    return { taxiType };
  }

  private isTaxiTypeValid(type: TaxiType): boolean {
    return this.TaxiTypes.includes(type);
  }
}
