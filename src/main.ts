import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createLogger, format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

interface EnvironmentVariables {
  PORT: number;
}

async function bootstrap() {
  // todo refactor & move code to a separate file
  // todo configure according to NODE_ENV
  const consoleTransportOptions: ConsoleTransportOptions = {
    handleExceptions: true,
    format: process.env.NODE_ENV === 'development' ? format.combine(format.colorize(), format.timestamp(), format.simple()) : format.simple(),
  };
  const instance = createLogger({ transports: [new transports.Console(consoleTransportOptions)] });
  const logger = WinstonModule.createLogger({ instance });

  const app = await NestFactory.create(AppModule, { logger });

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.get<number>('PORT') || 3000; // 환경 변수에서 PORT 값을 가져옵니다. 없으면 기본값 3000 사용

  await app.listen(port);
}

bootstrap();
