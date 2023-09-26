import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('account')
export class AccountController {
  // 전체 계좌 정보 조회
  @Get()
  getAllAccountInfo(): string {
    return 'return all account info';
  }

  // 계좌 id로 계좌 정보 조회
  @Get(':id')
  getAccountInfoById(@Param('id') accountId: string): string {
    return `return account info by id : ${accountId}`;
  }

  // 계좌 정보 등록
  @Post()
  createAccountInfo(): string {
    return 'create account info';
  }

  // 계좌 정보 수정
  @Patch(':id')
  updateAccountInfoById(@Param('id') accountId: string): string {
    return `update account info by id : ${accountId}`;
  }

  // 계좌 정보 삭제
  @Delete(':id')
  deleteAccountInfoById(@Param('id') accountId: string): string {
    return `delete account info by id : ${accountId}`;
  }
}
