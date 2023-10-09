import { Injectable } from '@nestjs/common';
import { PaymentInfoDto } from './domain/dto/payment-info.dto';
import { DailyEarningDTO } from './domain/dto/daily-earning.dto';
import { PaymentRepository } from './repository/payment.repository';
import { DailyEarningsRepository } from './repository/daily-earning.repository';
import { format } from 'date-fns';

@Injectable()
export class BillingService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly dailyEarningsRepository: DailyEarningsRepository,
  ) {}

  async processPayment(
    paymentInfo: PaymentInfoDto,
    amount: number,
  ): Promise<string> {
    console.log(paymentInfo);
    console.log(amount);
    /**
     *
     * 1. 결제 정보 및 금액 확인
     * 2. 해당하는 경우 결제 API를 사용하여 결제 처리
     * 3. 결제 내역 반환
     */
    return;
  }

  async saveUserPaymentInfo(paymentInfo: PaymentInfoDto): Promise<string> {
    const result = await this.paymentRepository.save(paymentInfo);

    // this.paymentRepository.save(paymentInfo);
    /**
     * 1. 결제 정보 확인
     * 2. 데이터베이스에 결제 정보 저장
     * 3. 저장 상태 반환
     */
    console.log(result);
    return;
  }

  async getPaymentInfo(userId: string): Promise<PaymentInfoDto> {
    const result = await this.paymentRepository.findByPaymentInfo(userId);
    /**
     * 1. 사용자 유효성 검사
     * 2. 데이터베이스에서 결제 정보 검색
     * 3. 결제 정보 반환
     */
    console.log(result);
    return;
  }

  /**
   * 1. 사용자 유효성 검사
   * 2. 당일의 수입 계산 또는 검색
   * 3. 수익 정보 반환
   */
  async getTodayEarnings(
    userId: string,
    earningDates?: string,
  ): Promise<DailyEarningDTO> {
    try {
      const parseEarningDates = (dates: string): Date[] =>
        dates.split(',').map((dateStr) => new Date(dateStr.trim()));

      const targetDates: Date[] = earningDates
        ? parseEarningDates(earningDates)
        : [new Date()];
      const formattedTargetDates: string[] = targetDates.map((date) =>
        format(date, 'yyyy-MM-dd'),
      );

      const results = Promise.all(
        formattedTargetDates.map((dateStr) =>
          this.dailyEarningsRepository.findByDateAndUserId(userId, dateStr),
        ),
      );

      return results;
    } catch (error) {
      console.error(
        `Error getting earnings for user ${userId} on date ${earningDates}:`,
        error,
      );
      throw error;
    }
  }

  async findByBankAccountNumber(
    accountNumber: PaymentInfoDto['accountNumber'],
  ) {
    const result = await this.paymentRepository.findByAccountNumber(
      accountNumber,
    );
    return result;
  }
}
