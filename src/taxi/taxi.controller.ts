import { Controller, Get, Param } from '@nestjs/common';

@Controller('taxi')
export class TaxiController {
  // 전체 택시 정보 조회
  @Get()
  getAllTaxiInfo(): string {
    return 'return all taxi info';
  }

  // 택시 Id로 택시 정보 조회
  @Get(':id')
  getTaxiInfoById(@Param('id') taxiId: string): string {
    return `return taxi info by id : ${taxiId}`;
  }

  // 택시 정보 등록
  createTaxiInfo(): string {
    return 'create taxi info';
  }

  // 택시 정보 수정
  updateTaxiInfo(): string {
    return 'update taxi info';
  }

  // 택시 정보 삭제
  deleteTaxiInfo(): string {
    return 'delete taxi info';
  }
}
