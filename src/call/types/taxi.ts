//얘는 추후에 taxi 도메인에서 관리하게 될 것이다.
export type TaxiType = 'NORMAL' | 'LUXURY' | 'DELUXE';

export type CallStatus = 'PENDING' | 'COMPLETE' | 'ARRIVED' | 'CANCELLED';

export type TaxiInfo = {
  no: string;
  driverNo: string;
  type: TaxiType;
};
