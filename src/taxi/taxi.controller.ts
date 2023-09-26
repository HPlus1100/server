import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('taxi')
export class TaxiController {
  // 전체 택시 정보 조회
  @Get()
  getAllTaxiInfo(): string {
    // 사용자 권한 확인

    return 'return all taxi info';
  }

  // 택시 Id로 택시 정보 조회
  @Get(':id')
  getTaxiInfoById(@Param('id') taxiId: string): string {
    // 사용자 권한 확인
    // 택시 id 존재 확인

    return `return taxi info by id : ${taxiId}`;
  }

  // 택시 정보 등록
  @Post()
  createTaxiInfo(): string {
    // 사용자 권한 확인
    /**
     * 파라미터 확인
     *
     */

    return 'create taxi info';
  }

  // 택시 정보 수정
  @Patch(':id')
  updateTaxiInfoById(@Param('id') taxiId: string): string {
    // 사용자 권한 확인
    /**
     * 파라미터 확인
     *
     */
    // 택시 id 존재 확인

    return `update taxi info by id : ${taxiId}`;
  }

  // 택시 정보 삭제
  @Delete(':id')
  deleteTaxiInfoById(@Param('id') taxiId: string): string {
    // 사용자 권한 확인
    // 택시 id 존재 확인

    return `delete taxi info by id : ${taxiId}`;
  }
}
