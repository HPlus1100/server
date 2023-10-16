import { Injectable } from '@nestjs/common';
import { PaymentInfoDto } from '@billing/domain/dto/payment-info.dto';
import { DailyEarningDTO } from '@billing/domain/dto/daily-earning.dto';
import { PaymentRepository } from '@billing/repository/payment.repository';
import { DailyEarningsRepository } from '@billing/repository/daily-earning.repository';
import { format } from 'date-fns';
import { PaymentMethod } from '@billing/domain/entity/payment-method.entity';

@Injectable()
export class BillingService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly dailyEarningsRepository: DailyEarningsRepository,
  ) {}

  async saveUserPaymentInfo(
    paymentInfo: PaymentInfoDto,
  ): Promise<PaymentInfoDto> {
    return await this.paymentRepository.save(paymentInfo);
  }

  async getPaymentInfoByUserId(userId: string): Promise<PaymentMethod> {
    return await this.paymentRepository.getPaymentInfoByUserId(userId);
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
          this.dailyEarningsRepository.getDailyEarningsForUser(userId, dateStr),
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

  async getPaymentInfoByAccountNumber(
    accountNumber: PaymentInfoDto['accountNumber'],
  ) {
    const result = await this.paymentRepository.getPaymentInfoByAccountNumber(
      accountNumber,
    );
    return result;
  }
}
