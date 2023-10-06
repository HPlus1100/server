import { Module } from '@nestjs/common';
import { TaxiController } from './taxi.controller';
import { TaxiService } from './taxi.service';
import { TaxiRepository } from './taxi.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaxiRepository])],
  controllers: [TaxiController],
  providers: [TaxiService, TaxiRepository],
})
export class TaxiModule {}
