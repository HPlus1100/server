import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { PaymentType } from '../type/billing.enum';

export class PaymentInfoDto {
  @IsNotEmpty()
  customerNo: string;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  accountNumber?: string;

  @ValidateIf((o) => o.accountNumber)
  @IsString()
  @Length(1, 50)
  accountHolderName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  cardNum?: string;

  @ValidateIf((o) => o.cardNum)
  @IsString()
  @Length(3, 4)
  cvc?: string;

  @ValidateIf((o) => o.cardNum)
  @IsDateString()
  expireDate?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
