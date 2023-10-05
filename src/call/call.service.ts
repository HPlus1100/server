import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCallDto } from './dto/createCall.dto';
import { CallRepository } from './call.repository';
import { TaxiInfo } from './types/taxi';
import { Call } from './call.entity';

@Injectable()
export class CallService {
  constructor(private callRepository: CallRepository) {}

  // @UsePipes(ValidationPipe)
  // async getAllCalls(): Promise<Call[]> {
  //   return await this.callRepository.find();
  // }

  // @UsePipes(ValidationPipe)
  // async getCallsByUserId(userId: string): Promise<Call[]> {
  //   const found = await this.callRepository.find({
  //     where: {
  //       customerNo: userId,
  //     },
  //   });
  //   if (!found) {
  //     throw new NotFoundException(`Can't find user with userId ${userId}`);
  //   }
  //   return found;
  // }

  async createCall(createCallDto: CreateCallDto): Promise<Call> {
    const { userId, taxiType } = createCallDto;
    //step1: 드라이버 리스트 조회
    //getDtriverList(taxiType);
    const availableDrivers = [
      {
        no: 'taxi-1',
        driverNo: 'driver-1',
        type: 'DELUXE',
        carNum: '서울 12 가 1234',
      },
      {
        no: 'taxi-2',
        driverNo: 'driver-2',
        type: 'NORMAL',
        carNum: '서울 12 가 1235',
      },
      {
        no: 'taxi-3',
        driverNo: 'driver-3',
        type: 'NORMAL',
        carNum: '서울 12 가 1215',
      },
    ];

    const typeMatchedDrivers = availableDrivers.filter(
      (driver) => driver.type === taxiType,
    );

    //step2: 드라이버 리스트 정렬 및 매칭
    const matchedDriver: TaxiInfo = {
      no: typeMatchedDrivers[0].no,
      driverNo: typeMatchedDrivers[0].driverNo,
      type: typeMatchedDrivers[0].type as TaxiInfo['type'],
    };

    //step3: 매칭 정보 저장

    const departureTime = new Date();
    const arrivalTime = new Date(
      departureTime.setHours(departureTime.getHours() + 1),
    );

    //나중에 component로 분리
    const call = this.callRepository.create({
      customerNo: userId,
      status: 'OPERATION',
      taxi: matchedDriver,
      departure: {
        address: '서울시 강남구',
        lat: 37.123,
        lng: 127.123,
      },
      arrival: {
        address: '서울시 강북구',
        lat: 36.555,
        lng: 122.555,
      },
      fare: 10000,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
    });
    const savedCall = await this.callRepository.save(call);

    //step4: 매칭 정보 리턴(유저용)
    return savedCall;
  }

  async deleteCallsByUserId(userId: string): Promise<string> {
    const result = await this.callRepository.delete({ customerNo: userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find user with id ${userId}`);
    }
    return `Delete user with id ${userId}`;
  }

  // createCallRecord(): string {
  //   return 'This action creates a new call record';
  // }
}
