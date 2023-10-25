import {
  Injectable,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCallDto, TerminateCallDto } from './dto/request';
import {
  ActiveCallForCustomerDto,
  ActiveCallForDriverDto,
} from './dto/response';
import { CallRepository } from './call.repository';
import { TaxiInfo } from './types/taxi';
import { Call } from './call.entity';
import { plainToInstance } from 'class-transformer';
import { PathApiRepository } from '@/externalApi/path-api.repository';

@Injectable()
export class CallService {
  constructor(
    private callRepository: CallRepository,
    private pathApiRepository: PathApiRepository,
  ) {}

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
    const { userId, taxiType, departure, arrival } = createCallDto;
    //step1: 드라이버 리스트 조회
    //getDtriverList(taxiType);
    const availableDrivers = [
      {
        no: 'taxi-1',
        driverNo: '1',
        type: 'DELUXE',
        carNum: '서울 12 가 1234',
      },
      {
        no: 'taxi-2',
        driverNo: '2',
        type: 'NORMAL',
        carNum: '서울 12 가 1235',
      },
      {
        no: 'taxi-3',
        driverNo: '3',
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

    //step3: 외부 api 호출
    const pathInfo = await this.pathApiRepository.getPathInfo({
      origin: {
        x: departure.lat,
        y: departure.lng,
      },
      destination: {
        x: arrival.lat,
        y: arrival.lng,
      },
    });

    //step4: 매칭 정보 저장

    const departureTime = new Date();
    const arrivalTime = new Date(
      departureTime.getTime() + pathInfo.duration * 1000,
    );

    //나중에 component로 분리
    const call = this.callRepository.create({
      customerNo: userId,
      driverNo: matchedDriver.driverNo,
      status: 'COMPLETE',
      taxi: matchedDriver,
      departure,
      arrival,
      fare: pathInfo.fare,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
    });
    const savedCall = await this.callRepository.save(call);

    //step5: 매칭 정보 리턴(유저용)
    return savedCall;
  }

  async terminateCall(
    callId: string,
    terminateCallDto: TerminateCallDto,
  ): Promise<boolean> {
    // 1. callId로 call 정보 조회
    const currentCall = await this.callRepository.findOne({
      where: { no: callId },
    });
    if (!currentCall) {
      throw new NotFoundException(`Can't find call with id ${callId}`);
    }

    // 2. call의 status UpdateDate
    await this.callRepository.update(
      { no: callId },
      {
        status: 'COMPLETE',
        ...terminateCallDto,
      },
    );
    // 3. payment 결제 서비스 호출(없다면 timeout)
    // paymentService.pay()
    // 4. payment 결제 완료되면 billing 의 createBilling 컴포넌트 호출
    // billingService.createBilling()
    // 5. billing 정보 리턴
    // 6. 레코드 기록이 삽입(call 데이터 통으로 삽입)
    // 7. return boolean
    return true;
  }

  async getActiveCallByCustomerId(
    customerId: string,
  ): Promise<ActiveCallForCustomerDto> {
    const activeCall = await this.callRepository.findOne({
      where: {
        customerNo: customerId,
      },
    });
    if (!activeCall) {
      throw new NotFoundException(`Can't find user with id ${customerId}`);
    }

    // 드라이버 정보 가져오기 기능 필요
    const driver = {
      no: '1',
      name: '김첨지',
      phone: '010-1111-2222',
      profileImage: 'https://picsum.photos/200',
    };

    //택시정보 가져오기 기능 필요
    const taxi = {
      no: '2',
      driverNo: '1',
      carNum: '서울 12 가 1234',
      type: 'DELUXE',
    };

    const activeCallForCustomer = {
      taxiInfo: taxi,
      driverInfo: driver,
      ...activeCall,
    };

    return plainToInstance(ActiveCallForCustomerDto, activeCallForCustomer);
  }

  /**
   * @description
   * 매칭 성공시 기사님이 받아갈 정보를 리턴해주는 API
   */
  @UsePipes(ValidationPipe)
  async getActiveCallByDriverId(
    driverId: string,
  ): Promise<ActiveCallForDriverDto> {
    const activeCall = await this.callRepository.findOne({
      where: {
        driverNo: driverId,
      },
    });
    if (!activeCall) {
      throw new NotFoundException(`Can't find user with id ${driverId}`);
    }
    // 유저 정보 가져오기 기능 필요
    const customer = {
      no: '1',
      userNo: '1',
      nickname: '홍길동',
      phone: '010-1234-1234',
      profileImg: 'https://picsum.photos/200',
      is_deleted: false,
      created_at: '2021-08-01T00:00:00.000Z',
      updated_at: '2021-08-01T00:00:00.000Z',
    };

    const activeCallForDriver: object = {
      ...activeCall,
      ...customer,
    };

    return plainToInstance(ActiveCallForDriverDto, activeCallForDriver);
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
