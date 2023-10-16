import { DataSource, Repository } from 'typeorm';
import { PaymentMethod } from '@billing/domain/entity/payment-method.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentRepository extends Repository<PaymentMethod> {
  constructor(private dataSource: DataSource) {
    super(PaymentMethod, dataSource.createEntityManager());
  }

  getPaymentInfoByUserId(
    userId: PaymentMethod['customerNo'],
  ): Promise<PaymentMethod> {
    return this.createQueryBuilder('payment_method')
      .where('payment_method.customerNo = :customerNo', { userId })
      .getOne();
  }

  getPaymentInfoByAccountNumber(
    accountNumber: PaymentMethod['accountNumber'],
  ): Promise<PaymentMethod> {
    return this.createQueryBuilder('payment_method')
      .where('payment_method.accountNumber = :accountNumber', { accountNumber })
      .getOne();
  }
}
