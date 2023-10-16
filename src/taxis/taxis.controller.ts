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
  findAll(): Promise<Taxi[]> {
    return this.taxisService.findAll();
  }

  // 택시 Id로 택시 정보 조회
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) taxiId: number): Promise<Taxi> {
    return this.taxisService.findOne(taxiId);
  }

  // 택시 정보 등록
  @Post()
  create(@Body() taxiInfo: CreateTaxiDto): Promise<ResponseTaxiDto> {
    return this.taxisService.create(taxiInfo);
  }

  // 택시 정보 수정
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) taxiId: number,
    @Body() taxiInfo: UpdateTaxiDto,
  ): Promise<ResponseTaxiDto> {
    return this.taxisService.update(taxiId, taxiInfo);
  }

  // 택시 정보 삭제
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) taxiId: number): Promise<ResponseTaxiDto> {
    return this.taxisService.remove(taxiId);
  }
}
