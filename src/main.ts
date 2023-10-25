import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TraceIdInterceptor } from '@/logger/trace/trace-id.interceptor';
import { LoggingInterceptor } from '@/logger/logging.interceptor';

interface EnvironmentVariables {
  PORT: number;
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TraceIdInterceptor(), new LoggingInterceptor());

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = configService.get<number>('PORT') || 3000; // 환경 변수에서 PORT 값을 가져옵니다. 없으면 기본값 3000 사용
  await app.listen(port);
}

bootstrap();
