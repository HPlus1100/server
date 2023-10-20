import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { CallModule } from './call/call.module';
import { TaxisModule } from './taxis/taxis.module';
import { BillingModule } from './billing/billing.module';
import { PaymentsModule } from './payments/payments.module';
import appConfig from '@/config/app.config';
import databaseConfig from '@/config/database.config';
import { LoggerMiddleware } from '@/middleware/logger/logger.middleware';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useClass: TypeOrmConfigService,
    }),
    CallModule,
    TaxisModule,
    BillingModule,
    PaymentsModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
