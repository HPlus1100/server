import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as winston from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: winston.Logger;

  constructor() {
    const isDevelopment =
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    const format = isDevelopment
      ? winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(
            ({ level, message, timestamp, ...metadata }) => {
              let msg = `${timestamp} [${level}] : ${message} `;
              if (metadata) {
                msg += JSON.stringify(metadata);
              }
              return msg;
            },
          ),
        )
      : winston.format.simple();

    this.logger = winston.createLogger({
      level: 'info',
      format,
      transports: [new winston.transports.Console()],
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    const traceId = request.headers['x-trace-id'] || 'N/A';

    const logInfo = {
      traceId,
      method: request.method,
      url: request.url,
      body: request.body,
      query: request.query,
      params: request.params,
    };

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - start;
        this.logger.info('Request', {
          ...logInfo,
          time,
          statusCode: response.statusCode,
        });
      }),
    );
  }
}
