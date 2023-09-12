import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private healthCheckService: HealthCheckService,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private httpHealthIndicator: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<unknown> {
    return this.healthCheckService.check([
      // HttpHealthIndicator 가 제공하는 pingCheck() 를 통해 다른 서버가 잘 동작하고 있는지 확인
      // https://docs.nestjs.com 에 요청을 보내서 받은 응답을 첫 번째 인수인 nestjs-docss 에 준다는 의미
      (): Promise<HealthIndicatorResult> =>
        this.httpHealthIndicator.pingCheck(
          'nestjs-docss',
          'https://docs.nestjs.com',
        ),
    ]);
  }
}
