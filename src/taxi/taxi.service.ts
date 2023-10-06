import { Injectable } from '@nestjs/common';
import { CreateTaxiDto } from './dto/create-taxi.dto';

@Injectable()
export class TaxiService {
  // 전체 택시 정보 조회
  getAllTaxiInfo(): string {
    // 사용자 권한 확인
    return 'return all taxi info';
  }

  // 택시 Id로 택시 정보 조회
  getTaxiInfoById(taxiId: string): string {
    // 사용자 권한 확인
    // 택시 id 존재 확인
    return `return taxi info by id : ${taxiId}`;
  }

  // 택시 정보 등록
  createTaxiInfo(taxiInfo: CreateTaxiDto): string {
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
    return `create taxi info ${taxiInfo}`;
  }

  // 택시 정보 수정
  updateTaxiInfoById(taxiId: string): string {
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

    return `update taxi info by id : ${taxiId}`;
  }

  // 택시 정보 삭제
  deleteTaxiInfoById(taxiId: string): string {
    // 사용자 권한 확인
    // 택시 id 존재 확인
    return `delete taxi info by id : ${taxiId}`;
  }
}
