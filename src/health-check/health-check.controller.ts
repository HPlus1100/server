import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  check() {
    return this.health.check([
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      () =>
        this.http.pingCheck(
          'nestjs-docss',
          'https://docs.nestjs.com',
        ),
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      () => this.db.pingCheck('database', { timeout: 1500 }),
    ]);
  }
}
