import { DataSource, Repository } from 'typeorm';
import { Call } from './call.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CallRepository extends Repository<Call> {
  constructor(private dataSource: DataSource) {
    super(Call, dataSource.createEntityManager());
  }
}
