import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaxiService } from './taxi.service';

@Controller('taxi')
export class TaxiController {
  constructor(private readonly taxiService: TaxiService) {}

  // 전체 택시 정보 조회
  @Get()
  getAllTaxiInfo(): string {
    return this.taxiService.getAllTaxiInfo();
  }

  // 택시 Id로 택시 정보 조회
  @Get(':id')
  getTaxiInfoById(@Param('id') taxiId: string): string {
    return this.taxiService.getTaxiInfoById(taxiId);
  }

  // 택시 정보 등록
  // TODO: 파라미터 받아야함
  @Post()
  createTaxiInfo(): string {
    return this.taxiService.createTaxiInfo();
  }

  // 택시 정보 수정
  @Patch(':id')
  updateTaxiInfoById(@Param('id') taxiId: string): string {
    return this.taxiService.updateTaxiInfoById(taxiId);
  }

  // 택시 정보 삭제
  @Delete(':id')
  deleteTaxiInfoById(@Param('id') taxiId: string): string {
    return this.taxiService.deleteTaxiInfoById(taxiId);
  }
}
