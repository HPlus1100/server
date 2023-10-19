import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { createLogger, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

interface EnvironmentVariables {
  PORT: number;
}

async function bootstrap() {
  // todo refactor & move code to a separate file
  // todo configure according to NODE_ENV
  const instance = createLogger({ transports: [new transports.Console()] });
  const logger = WinstonModule.createLogger({ instance });

  const app = await NestFactory.create(AppModule, { logger });

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.get<number>('PORT') || 3000; // 환경 변수에서 PORT 값을 가져옵니다. 없으면 기본값 3000 사용

  await app.listen(port);
}

bootstrap();
