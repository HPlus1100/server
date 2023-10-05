import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { CallRepository } from './call.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './call.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  controllers: [CallController],
  providers: [CallService, CallRepository],
})
export class CallModule {}
