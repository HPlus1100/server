import { IsNotEmpty } from 'class-validator';

export class TerminateCallDto {
  @IsNotEmpty()
  arrivalTime: Date;

  @IsNotEmpty()
  fare: number;
}
