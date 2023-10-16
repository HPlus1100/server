import { Module } from '@nestjs/common';
import { TaxisController } from './taxis.controller';
import { TaxisService } from './taxis.service';
import { TaxiRepository } from './taxi.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaxiRepository])],
  controllers: [TaxisController],
  providers: [TaxisService, TaxiRepository],
})
export class TaxisModule {}
