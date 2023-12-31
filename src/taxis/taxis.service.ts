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
import { Taxi } from './entities/taxi.entity';
import { TaxiRepository } from './taxi.repository';
import { CarType } from './types/taxi.enum';

@Injectable()
export class TaxisService {
  constructor(
    @InjectRepository(TaxiRepository)
    private taxiRepository: TaxiRepository,
  ) {}

  /*
    택시 조회시 드라이버 정보도 조회되어야 한다고 말씀해주심
 */

  // 전체 택시 정보 조회
  async findAll(): Promise<Taxi[]> {
    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current User is unauthorized`);
    }

    const taxis = await this.taxiRepository.find();

    return taxis;
  }

  // 택시 Id로 택시 정보 조회
  async findOne(taxiId: number): Promise<Taxi> {
    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current User is unauthorized`);
    }

    // 택시 id 존재 확인
    const taxi = await this.taxiRepository.findOneBy({
      no: taxiId,
    });

    if (!taxi) {
      throw new NotFoundException(`Can't find Taxi with id ${taxiId}`);
    }

    return taxi;
  }

  // 택시 정보 등록
  async create(createTaxiDto: CreateTaxiDto): Promise<ResponseTaxiDto> {
    const { driverLicenseNumber, carType, licensePlateNumber } = createTaxiDto;

    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current User is unauthorized`);
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
    if (!this.checkDriverLicenseNumber(driverLicenseNumber)) {
      throw new NotFoundException(
        `Can't find Driver's License Number : ${driverLicenseNumber}`,
      );
    }

    // TODO 운전 면허증 번호 확인

    // 택시 종류 확인
    if (!this.checkCarType(carType)) {
      throw new NotFoundException(`Car Type is invalid : ${carType}`);
    }

    // 차량 번호 확인
    if (!this.checkLicensePlateNumber(licensePlateNumber)) {
      throw new Error(
        `License Plate Number is invalid : ${licensePlateNumber}`,
      );
    }

    const newTaxi = this.taxiRepository.create({
      ...createTaxiDto,
    });

    await this.taxiRepository.save(newTaxi);

    return plainToInstance(ResponseTaxiDto, newTaxi);
  }

  // 택시 정보 수정
  async update(
    taxiId: number,
    updateTaxiDto: UpdateTaxiDto,
  ): Promise<ResponseTaxiDto> {
    const { driverLicenseNumber, carType, licensePlateNumber } = updateTaxiDto;

    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current User is unauthorized`);
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
    const taxi = await this.taxiRepository.findOneBy({
      no: taxiId,
    });

    if (!taxi) {
      throw new NotFoundException(`Can't find Taxi with id ${taxiId}`);
    }

    // 드라이버 존재 확인
    // TODO DB 조회로 바뀌어야 할 거 같음
    if (!this.checkDriverLicenseNumber(driverLicenseNumber)) {
      throw new NotFoundException(
        `Can't find Driver's License Number ${driverLicenseNumber}`,
      );
    }

    // TODO 운전 면허증 번호 확인

    // 택시 종류 확인
    if (!this.checkCarType(carType)) {
      throw new NotFoundException(`Car Type is invalid : ${carType}`);
    }

    // 차량 번호 확인
    if (!this.checkLicensePlateNumber(licensePlateNumber)) {
      throw new Error(
        `License Plate Number is invalid : ${licensePlateNumber}`,
      );
    }

    await this.taxiRepository.update(taxiId, {
      ...updateTaxiDto,
    });

    return plainToInstance(ResponseTaxiDto, updateTaxiDto);
  }

  // 택시 정보 삭제
  async remove(taxiId: number): Promise<ResponseTaxiDto> {
    // 사용자 권한 확인
    if (!this.checkAuthenticated()) {
      throw new UnauthorizedException(`Current User is unauthorized`);
    }

    // 택시 id 존재 확인
    const taxi = await this.taxiRepository.findOneBy({
      no: taxiId,
    });

    if (!taxi) {
      throw new NotFoundException(`Can't find Taxi with id ${taxiId}`);
    }

    // TODO Delete 호출이 아닌 Update 처리 필요
    const result = await this.taxiRepository.delete(taxiId);

    // delete return 값 -> DeleteResult {raw : [], affected : 1}
    // delete가 성공할 경우 affected의 값이 1로 옮
    if (result.affected === 0) {
      throw new NotFoundException(`${taxiId} is not exist`);
    }

    return plainToInstance(ResponseTaxiDto, taxi);
  }

  // 아래 내용을 Component 처리하는지 확인 필요

  private checkAuthenticated(): boolean {
    // 유저 사용 권한 체크
    return true;
  }

  private checkDriverLicenseNumber(driverLicenseNumber: number): boolean {
    // TODO driverLicenseNumber 로 driver 존재 체크
    return driverLicenseNumber !== 0;
  }

  private checkLicensePlateNumber(licensePlateNumber: string): boolean {
    // 차량번호 정규식 체크
    // ex) 12가 1234 || 123가 1234
    // 숫자 2,3개 허용
    // 한글 1개 허용
    // 숫자 4자
    const regex = /\d{2,3}[가-힣]{1}\d{4}/;
    return regex.test(licensePlateNumber);
  }

  private checkCarType(carType: CarType): boolean {
    // 선언된 CarType으로 체크
    return carType in CarType;
  }
}
