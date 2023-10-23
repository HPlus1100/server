import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { CallModule } from '@call/call.module';
import { TaxisModule } from '@taxis/taxis.module';
import { BillingModule } from '@billing/billing.module';
import { PaymentsModule } from '@payments/payments.module';
import appConfig from '@/config/app.config';
import databaseConfig from '@/config/database.config';
import { LoggerService } from '@/logger/logger.service';
import { TraceIdMiddleware } from '@/logger/trace/trace-id.middleware';
import { LoggingMiddleware } from '@/logger/logging.middleware';

@Module({
  imports: [
    BillingModule,
    CallModule,
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    HttpModule,
    PaymentsModule,
    TaxisModule,
    TerminusModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, LoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TraceIdMiddleware, LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
