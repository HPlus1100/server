import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BillingService } from '@billing/billing.service';
import { PaymentInfoDto } from '@billing/domain/dto/payment-info.dto';
import { PaymentMethod } from './domain/entity/payment-method.entity';
import { DailyEarningDTO } from './domain/dto/daily-earning.dto';
import { PaymentResponse } from '@billing/domain/type/payment-response.type';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  /**
   * 결제 EndPoint
   * ->보류 : 결제정보를 찾은 후 payment-API사용이라 생각했으나, 단순 DB CRUD로 변경.
   * -> findOne
   * @param {paymentInfo: PaymentInfo, amount: number} - 결제정보, 결제금액
   * @returns {status: string; amount: number; ...otherData} - 결제결과, 처리된금x`액
   */
  @Post('process')
  async processBillingPayment(
    @Body() paymentInfo: PaymentInfoDto,
    @Body('amount') amount: string,
  ): Promise<PaymentResponse> {
    // 1.3초 대기
    await new Promise((resolve) => setTimeout(resolve, 1300));

    return {
      amount: amount,
      method: paymentInfo.type,
      status: 'success',
    };
  }

  /**
   * 청구(결제) 수단 저장 EndPoint -> create
   * @param {PaymentInfo} paymentInfo - 결제 수단 정보
   * @returns {status: string} - 정보 저장 상태를 반환.
   * create
   */
  @Post('payment-info')
  savePaymentInfo(@Body() PaymentInfoDto: PaymentInfoDto): string {
    this.billingService.saveUserPaymentInfo(PaymentInfoDto);
    return 'PaymentInfo save controller';
  }

  /**
   * 카드/계좌 정보 조회 EndPoint
   * @param {string} userId - 유저 id
   * @returns {Promise<PaymentMethod>} - 조회한 카드 또는 계좌 정보를 반환.
   * create
   */
  @Get('payment-info/:userId')
  selectPaymentInfo(@Param('userId') userId: string): Promise<PaymentMethod> {
    const result = this.billingService.getPaymentInfoByUserId(userId);
    return result;
  }

  /**
   * 당일 수익 조회 EndPoint
   * @param {string} userId - 유저 id
   * @Param {Date} earningsDates - 조회 날짜
   * @returns {Promise<DailyEarningDTO>} - 조회한 당일 수익 정보
   * -> selectMany
   */
  @Get('earnings-today/:userId')
  async getEarningsToday(
    @Param('userId') userId: string,
    @Query('earningDate') earningsDates: string,
  ): Promise<DailyEarningDTO> {
    const result = await this.billingService.getTodayEarnings(
      userId,
      earningsDates,
    );
    return result;
  }
}
