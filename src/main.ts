import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { createAppLogger } from '@/config/logger.config';

interface EnvironmentVariables {
  PORT: number;
}

async function bootstrap() {
  const logger = WinstonModule.createLogger({ instance: createAppLogger() });

  const app = await NestFactory.create(AppModule, { logger });

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.get<number>('PORT') || 3000; // 환경 변수에서 PORT 값을 가져옵니다. 없으면 기본값 3000 사용

  await app.listen(port);
}

bootstrap();
