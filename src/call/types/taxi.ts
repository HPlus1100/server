//얘는 추후에 taxi 도메인에서 관리하게 될 것이다.
export type TaxiType = 'regular' | 'blue' | 'black';

export type CallStatus = 'WAITING' | 'OPERATION' | 'TERMINATION' | 'DAYOFF';

export type TaxiInfo = {
  no: string;
  driverNo: number;
  type: TaxiType;
};
