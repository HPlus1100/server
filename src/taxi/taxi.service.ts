import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { ResponseTaxiDto } from './dto/response-taxi.dto';
import { UpdateTaxiDto } from './dto/update-taxi.dto';
import { Taxi } from './taxi.entity';
import { TaxiRepository } from './taxi.repository';
import { CarType } from './types/taxi.enum';

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
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current user is unauthorized`);
    }

    const AllTaxiInfo = await this.taxiRepository.find();

    return AllTaxiInfo;
  }

  // 택시 Id로 택시 정보 조회
  async getTaxiInfoById(taxiId: number): Promise<Taxi> {
    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current user is unauthorized`);
    }

    // 택시 id 존재 확인
    const taxiInfo = await this.taxiRepository.findOneBy({
      no: taxiId,
    });

    if (!taxiInfo) {
      throw new NotFoundException(`Can't find taxi with id ${taxiId}`);
    }

    return taxiInfo;
  }

  // 택시 정보 등록
  async createTaxiInfo(createTaxiDto: CreateTaxiDto): Promise<ResponseTaxiDto> {
    const { driverNo, carType, carNum } = createTaxiDto;

    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current user is unauthorized`);
    }

    /**
     * 파라미터 확인
     *  드라이버
     *  => 드라이버 존재 확인
     *  택시 종류
     *  => 택시 종류 확인
     *  차량 번호
     *  => 차량 번호 확인
     */

    // 드라이버 존재 확인
    if (!this.checkDriverNo(driverNo)) {
      throw new NotFoundException(`Can't find driver no ${driverNo}`);
    }

    // TODO 운전 면허증 번호 확인

    // 택시 종류 확인
    if (!this.checkCarType(carType)) {
      throw new NotFoundException(`Car Type is invalid : ${carType}`);
    }

    // 차량 번호 확인
    if (!this.checkCarNum(carNum)) {
      throw new Error(`Car Num is invalid : ${carNum}`);
    }

    const newTaxiInfo = this.taxiRepository.create({
      ...createTaxiDto,
    });

    await this.taxiRepository.save(newTaxiInfo);

    return plainToInstance(ResponseTaxiDto, newTaxiInfo);
  }

  // 택시 정보 수정
  async updateTaxiInfoById(
    taxiId: number,
    updateTaxiDto: UpdateTaxiDto,
  ): Promise<ResponseTaxiDto> {
    const { driverNo, carType, carNum } = updateTaxiDto;

    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current user is unauthorized`);
    }

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
    const taxiInfo = await this.taxiRepository.findOneBy({
      no: taxiId,
    });

    if (!taxiInfo) {
      throw new NotFoundException(`Can't find taxi with id ${taxiId}`);
    }

    // 드라이버 존재 확인
    // TODO DB 조회로 바뀌어야 할 거 같음
    if (!this.checkDriverNo(driverNo)) {
      throw new NotFoundException(`Can't find driver no ${driverNo}`);
    }

    // TODO 운전 면허증 번호 확인

    // 택시 종류 확인
    if (!this.checkCarType(carType)) {
      throw new NotFoundException(`Car Type is invalid : ${carType}`);
    }

    // 차량 번호 확인
    if (!this.checkCarNum(carNum)) {
      throw new Error(`Car Num is invalid : ${carNum}`);
    }

    await this.taxiRepository.update(taxiId, {
      ...updateTaxiDto,
    });

    return plainToInstance(ResponseTaxiDto, updateTaxiDto);
  }

  // 택시 정보 삭제
  async deleteTaxiInfoById(taxiId: number): Promise<ResponseTaxiDto> {
    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current user is unauthorized`);
    }

    // 택시 id 존재 확인
    const taxiInfo = await this.taxiRepository.findOneBy({
      no: taxiId,
    });

    if (!taxiInfo) {
      throw new NotFoundException(`Can't find taxi with id ${taxiId}`);
    }

    // TODO Delete 호출이 아닌 Update 처리 필요
    const result = await this.taxiRepository.delete(taxiId);

    // delete return 값 -> DeleteResult {raw : [], affected : 1}
    // delete가 성공할 경우 affected의 값이 1로 옮
    if (result.affected === 0) {
      throw new NotFoundException(`${taxiId} is not exist`);
    }

    return plainToInstance(ResponseTaxiDto, taxiInfo);
  }

  // 아래 내용을 Component 처리하는지 확인 필요

  private checkAuthenticated(): boolean {
    // 유저 사용 권한 체크
    return true;
  }

  private checkDriverNo(driverNo: number): boolean {
    // TODO driverNo 로 driver 존재 체크
    return driverNo !== 0;
  }

  private checkCarNum(carNum: string): boolean {
    // 차량번호 정규식 체크
    // ex) 12가 1234 || 123가 1234
    // 숫자 2,3개 허용
    // 한글 1개 허용
    // 숫자 4자
    const regex = /\d{2,3}[가-힣]{1}\d{4}/;
    return regex.test(carNum);
  }

  private checkCarType(carType: CarType): boolean {
    // 선언된 CarType으로 체크
    return carType in CarType;
  }
}
