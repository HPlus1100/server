import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { BillingStatus } from '../type/billing.enum';

export class BillingDto {
  @IsNotEmpty()
  readonly billingNo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsEnum(BillingStatus)
  @IsNotEmpty()
  readonly status: BillingStatus;

  @IsOptional()
  readonly createdTime?: Date;

  @IsOptional()
  readonly updatedTime?: Date;
}
