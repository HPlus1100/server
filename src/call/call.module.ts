import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { CallRepository } from './call.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CallRepository])],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
