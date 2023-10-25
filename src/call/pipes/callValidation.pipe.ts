import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaxiType } from '../types/taxi';
import { CreateCallDto } from '../dto/request';

export class CallValidationPipe implements PipeTransform {
  readonly TaxiTypes: Array<TaxiType> = ['NORMAL', 'LUXURY', 'DELUXE'];

  transform(value: CreateCallDto): CreateCallDto {
    const taxiType = value.taxiType.toUpperCase() as TaxiType;
    if (!this.isTaxiTypeValid(taxiType)) {
      throw new BadRequestException(`"${taxiType}" is an invalid taxi type`);
    }
    return value;
  }

  private isTaxiTypeValid(type: TaxiType): boolean {
    return this.TaxiTypes.includes(type);
  }
}
