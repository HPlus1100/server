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
import { TaxisService } from './taxis.service';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { UpdateTaxiDto } from './dto/update-taxi.dto';
import { Taxi } from './entities/taxi.entity';
import { ResponseTaxiDto } from './dto/response-taxi.dto';

@Controller('taxis')
export class TaxisController {
  constructor(private readonly taxisService: TaxisService) {}

  // 전체 택시 정보 조회
  @Get()
  getAllTaxiInfo(): Promise<Taxi[]> {
    return this.taxisService.getAllTaxiInfo();
  }

  // 택시 Id로 택시 정보 조회
  @Get(':id')
  getTaxiInfoById(@Param('id', ParseIntPipe) taxiId: number): Promise<Taxi> {
    return this.taxisService.getTaxiInfoById(taxiId);
  }

  // 택시 정보 등록
  @Post()
  createTaxiInfo(@Body() taxiInfo: CreateTaxiDto): Promise<ResponseTaxiDto> {
    return this.taxisService.createTaxiInfo(taxiInfo);
  }

  // 택시 정보 수정
  @Patch(':id')
  updateTaxiInfoById(
    @Param('id', ParseIntPipe) taxiId: number,
    @Body() taxiInfo: UpdateTaxiDto,
  ): Promise<ResponseTaxiDto> {
    return this.taxisService.updateTaxiInfoById(taxiId, taxiInfo);
  }

  // 택시 정보 삭제
  @Delete(':id')
  deleteTaxiInfoById(
    @Param('id', ParseIntPipe) taxiId: number,
  ): Promise<ResponseTaxiDto> {
    return this.taxisService.deleteTaxiInfoById(taxiId);
  }
}
