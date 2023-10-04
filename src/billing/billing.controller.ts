import { Controller, Get, Param, Post } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  /**
   * 결제 EndPoint
   *
   * @param {paymentInfo: PaymentInfo, amount: number} - 결제정보, 결제금액
   * @returns {status: string; amount: number; ...otherData} - 결제결과, 처리된금액
   */
  @Post('process')
  async processBillingPayment(): Promise<string> {
    /**
     * 의문 1. 결제 관련 로직을 비동기로 처리하는게 옳은 것인가..?
     * -> 결제 요청같은경우, 확장성 및 UX 측면에서는 비동기가맞으나, 실제 금액이 처리되는 앱은 아니다보니, 고민을 해봐야 할 것 같음.
     *
     * 구현
     * -> 매개변수 DTO사용
     * -> 결제 정보, 금액 확인 및 유효성 검사. (금액적인 부분은 유효성검사가 있다면 좋을것같다 생각)
     * -> 유저 확인(결제 요청을 한 유저)
     *
     * -> 금액 및 유저 확인 후 결제 API를 위한 Service로 전달하거나 실패 메시지 전달.
     */
  }

  /**
   * 청구(결제) 수단 저장 EndPoint
   * @param {PaymentInfo} paymentInfo - 결제 수단 정보
   * @returns {status: string} - 정보 저장 상태를 반환.
   */
  @Post('payment-info')
  savePaymentInfo(): string {
    /**
     * 구현
     * -> 매개변수 DTO사용
     * -> 유저 확인
     * -> 필수 필드값이 존재하는지 여부 확인. 없다면 반환.
     * -> 유저 및 필드값 유효성 검사 확인 한다면 service 계층으로 전달.
     */

    return 'PaymentInfo save controller';
  }

  /**
   * 카드/계좌 정보 조회 EndPoint
   * @param {string} userId - 유저 id
   * @returns {PaymentInfo} - 조회한 카드 또는 계좌 정보를 반환.
   */
  @Get('payment-info/:userId')
  async selectPaymentInfo(@Param('userId') userId: string) {
    /**
     * 구현
     * -> 유저 유효성 검사
     * -> 인증된 사용자면 service계층전달.
     * -> 인증되지않았다면 실패
     */
    return `welcome! : ${userId} This service select your PaymentInfo`;
  }

  /**
   * 당일 수익 조회 EndPoint
   * @param {string} userId - 유저 id
   * @returns {DailyEarnings} - 조회한 당일 수익 정보
   */
  @Get('earnings-today/:userId')
  async getEarningsToday(@Param('userId') userId: string) {
    /**
     * 구현
     * -> 유저 유효성 검사
     * -> 인증된 사용자-> service계층 전달.
     * -> 인증되지 않았다면 실패.
     */

    return `welcome! : ${userId} This service select your DailyEarnings`;
  }
}
