export interface Call {
  id: string;
  userId: string;
  taxiType: string;
  createdAt: Date;
  estimatedTime: number;
  estimatedFare: number;
}

export interface CallRecord {
  id: string;
  userId: string;
  driverId: string;
  createdAt: Date;
  endedAt: Date;
  time: number;
  fare: number;
}
