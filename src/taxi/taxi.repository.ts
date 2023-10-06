import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Taxi } from './taxi.entity';

@Injectable()
export class TaxiRepository extends Repository<Taxi> {
  constructor(private dataSource: DataSource) {
    super(Taxi, dataSource.createEntityManager());
  }
}
