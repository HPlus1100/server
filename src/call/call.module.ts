import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { CallRepository } from './call.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './call.entity';
import { PathApiRepository } from '@/externalApi/path-api.repository';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from '@/logger/logger.service';
@Module({
  imports: [TypeOrmModule.forFeature([Call]), ConfigModule, HttpModule],
  controllers: [CallController],
  providers: [CallService, CallRepository, PathApiRepository, LoggerService],
})
export class CallModule {}
