import { Injectable } from '@nestjs/common';
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from '@payments/entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from '@payments/payment.repository';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  // create(createPaymentDto: CreatePaymentDto) {
  //   return 'This action adds a new payment';
  // }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} payment`;
  // }

  // update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   return `This action updates a #${id} payment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} payment`;
  // }
}
