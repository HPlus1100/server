import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('account')
export class AccountController {
  // 전체 계좌 정보 조회
  @Get()
  getAllAccountInfo(): string {
    // 사용자 권한 확인

    return 'return all account info';
  }

  // 계좌 id로 계좌 정보 조회
  @Get(':id')
  getAccountInfoById(@Param('id') accountId: string): string {
    // 사용자 권한 확인
    // 계좌 id 존재 확인

    return `return account info by id : ${accountId}`;
  }

  // 계좌 정보 등록
  @Post()
  createAccountInfo(): string {
    // 사용자 권한 확인
    /**
     * 파라미터 확인
     */
    // 계좌 번호 유효성 검사
    // 계좌 id 생성

    return 'create account info';
  }

  // 계좌 정보 수정
  @Patch(':id')
  updateAccountInfoById(@Param('id') accountId: string): string {
    // 사용자 권한 확인
    /**
     * 파라미터 확인
     */
    // 계좌 id 존재 확인

    return `update account info by id : ${accountId}`;
  }

  // 계좌 정보 삭제
  @Delete(':id')
  deleteAccountInfoById(@Param('id') accountId: string): string {
    // 사용자 권한 확인
    // 계좌 id 존재 확인

    return `delete account info by id : ${accountId}`;
  }
}
