import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { CallModule } from './call/call.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DriverController } from './driver/driver.controller';
import { DriverModule } from './driver/driver.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';

@Module({
	imports: [
		TerminusModule,
		HttpModule,
		ConfigModule.forRoot({
			envFilePath: [`${__dirname}/config/env/.env.${process.env.NODE_ENV}`],
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfigService,
		}),
		CallModule,
		AuthModule,
		UserModule,
		DriverModule,
		CustomerModule
	],
	controllers: [AppController, HealthCheckController, DriverController, CustomerController],
	providers: [AppService],
})
export class AppModule {}
