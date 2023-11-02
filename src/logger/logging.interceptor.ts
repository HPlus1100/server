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
import WinstonCloudwatch, {
  CloudwatchTransportOptions,
} from 'winston-cloudwatch';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: winston.Logger;

  constructor() {
    const format = winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level}] : ${message} `;
        if (Object.keys(metadata).length > 0) {
          msg += JSON.stringify(metadata);
        }
        return msg;
      }),
    );

    const cloudWatchConfig: CloudwatchTransportOptions = {
      logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
      logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      awsRegion: process.env.AWS_REGION,
    };
    this.logger = winston.createLogger({
      level: 'info',
      format,
      transports: [new WinstonCloudwatch(cloudWatchConfig)],
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
        this.logger.info(
              `Request ${JSON.stringify({
                ...logInfo,
                time,
                statusCode: response.statusCode,
          })}`,
        );
      }),
    );
  }
}
