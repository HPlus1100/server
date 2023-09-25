import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TaxiController } from './taxi/taxi.controller';
import { TaxiService } from './taxi/taxi.service';
import { TaxiModule } from './taxi/taxi.module';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TaxiModule,
  ],
  controllers: [AppController, HealthCheckController, TaxiController],
  providers: [AppService, TaxiService],
})
export class AppModule {}
