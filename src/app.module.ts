import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    AccountModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
