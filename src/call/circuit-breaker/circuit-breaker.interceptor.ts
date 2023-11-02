/* eslint-disable @typescript-eslint/ban-types */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CircuitBreaker } from './circuit-breaker';
import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly loggerService: LoggerService;
  private readonly circuitBreakerByHandler = new WeakMap<
    Function,
    CircuitBreaker
  >();

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const methodRef = context.getHandler();

    let circuitBreaker: CircuitBreaker;
    if (this.circuitBreakerByHandler.has(methodRef))
      circuitBreaker = this.circuitBreakerByHandler.get(methodRef);
    else {
      circuitBreaker = new CircuitBreaker({
        successThreshold: 3,
        failureThreshold: 3,
        openToHalfOpenWaitTime: 60000,
        loggerService: this.loggerService,
      });
      this.circuitBreakerByHandler.set(methodRef, circuitBreaker);
    }

    return circuitBreaker.executeRequest(next);
  }
}
