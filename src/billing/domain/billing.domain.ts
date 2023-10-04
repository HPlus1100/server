import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsInt,
  IsEnum,
} from 'class-validator';
import { BillingStatus } from './billing.entity';

export class BillingDomain {
  @IsUUID()
  @IsNotEmpty()
  readonly billingNo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsInt()
  @IsOptional()
  readonly distance?: number;

  @IsEnum(BillingStatus)
  @IsNotEmpty()
  readonly status: BillingStatus;

  @IsOptional()
  readonly createdTime?: Date;

  @IsOptional()
  readonly updatedTime?: Date;
}
