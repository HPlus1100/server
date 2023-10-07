import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { UpdateTaxiDto } from './dto/update-taxi.dto';
import { Taxi } from './taxi.entity';

@Controller('taxi')
export class TaxiController {
  constructor(private readonly taxiService: TaxiService) {}

  // commit 테스트

  // 전체 택시 정보 조회
  @Get()
  getAllTaxiInfo(): Promise<Taxi[]> {
    return this.taxiService.getAllTaxiInfo();
  }

  // 택시 Id로 택시 정보 조회
  @Get(':id')
  getTaxiInfoById(@Param('id', ParseIntPipe) taxiId: number): Promise<Taxi> {
    return this.taxiService.getTaxiInfoById(taxiId);
  }

  // 택시 정보 등록
  @Post()
  createTaxiInfo(@Body() taxiInfo: CreateTaxiDto): Promise<Taxi> {
    return this.taxiService.createTaxiInfo(taxiInfo);
  }

  // 택시 정보 수정
  @Patch(':id')
  updateTaxiInfoById(
    @Param('id', ParseIntPipe) taxiId: number,
    @Body() taxiInfo: UpdateTaxiDto,
  ): Promise<string> {
    return this.taxiService.updateTaxiInfoById(taxiId, taxiInfo);
  }

  // 택시 정보 삭제
  @Delete(':id')
  deleteTaxiInfoById(
    @Param('id', ParseIntPipe) taxiId: number,
  ): Promise<string> {
    return this.taxiService.deleteTaxiInfoById(taxiId);
  }
}
