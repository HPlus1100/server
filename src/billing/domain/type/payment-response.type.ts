import { PaymentType } from '@billing/domain/type/billing.enum';

export type PaymentResponse = {
  amount: string;
  method: PaymentType;
  status: string;
};
