import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PaymentType } from '../type/billing.enum';

export class PaymentInfoDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  accountNumber: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  cardNum: string;
}
