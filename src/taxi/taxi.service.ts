import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { UpdateTaxiDto } from './dto/update-taxi.dto';
import { Taxi } from './taxi.entity';
import { TaxiRepository } from './taxi.repository';

@Injectable()
export class TaxiService {
  constructor(
    @InjectRepository(TaxiRepository)
    private taxiRepository: TaxiRepository,
  ) {}

  /*
    택시 조회시 드라이버 정보도 조회되어야 한다고 말씀해주심
 */

  // 전체 택시 정보 조회
  async getAllTaxiInfo(): Promise<Taxi[]> {
    // 사용자 권한 확인

    const AllTaxiInfo = await this.taxiRepository.find();

    return AllTaxiInfo;
  }

  // 택시 Id로 택시 정보 조회
  async getTaxiInfoById(taxiId: number): Promise<Taxi> {
    // 사용자 권한 확인

    // 택시 id 존재 확인
    const taxiInfo = await this.taxiRepository.findOneBy({
      driverNo: taxiId,
    });

    if (!taxiInfo) {
      throw new NotFoundException(`Can't find taxi with id ${taxiId}`);
    }

    return taxiInfo;
  }

  // 택시 정보 등록
  async createTaxiInfo(createTaxiDto: CreateTaxiDto): Promise<Taxi> {
    // 사용자 권한 확인
    /**
     * 파라미터 확인
     *  드라이버
     *  => 드라이버 존재 확인
     *  택시 종류
     *  => 택시 종류 확인
     *  차량 번호
     *  => 차량 번호 확인
     */
    // 택시 id 생성

    // 드라이버 존재 확인

    // 택시 종류 확인

    // 차량 번호 확인

    const newTaxiInfo = this.taxiRepository.create({
      ...createTaxiDto,
    });

    await this.taxiRepository.save(newTaxiInfo);

    return newTaxiInfo;
  }

  // 택시 정보 수정
  async updateTaxiInfoById(
    taxiId: number,
    updateTaxiDto: UpdateTaxiDto,
  ): Promise<string> {
    // 사용자 권한 확인
    /**
     * 파라미터 확인
     * 드라이버
     *  => 드라이버 존재 확인
     *  택시 종류
     *  => 택시 종류 확인
     *  차량 번호
     *  => 차량 번호 확인
     */
    // 택시 id 존재 확인

    await this.taxiRepository.update(taxiId, {
      ...updateTaxiDto,
    });

    // TODO return 정의 필요
    return `update taxi info by id : ${taxiId}, ${updateTaxiDto}`;
  }

  // 택시 정보 삭제
  async deleteTaxiInfoById(taxiId: number): Promise<string> {
    // 사용자 권한 확인
    // 택시 id 존재 확인

    const result = await this.taxiRepository.delete(taxiId);

    // delete return 값 -> DeleteResult {raw : [], affected : 1}
    // delete가 성공할 경우 affected의 값이 1로 옮
    if (result.affected === 0) {
      throw new NotFoundException(`${taxiId} is not exist`);
    }

    // TODO return 정의 필요
    return `delete taxi info by id : ${taxiId}`;
  }
}
