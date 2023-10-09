import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

interface EnvironmentVariables {
  PORT: number;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  const port = +configService.get<number>('PORT') || 3000; // 환경 변수에서 PORT 값을 가져옵니다. 없으면 기본값 3000 사용

  await app.listen(port);
}
bootstrap();
