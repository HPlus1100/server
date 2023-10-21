import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const isDevelopment =
      !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    const format = isDevelopment
      ? winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),
        )
      : winston.format.simple();

    this.logger = winston.createLogger({
      level: 'info',
      format,
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string, traceId: string) {
    this.logger.info(`${message} [TraceID: ${traceId}]`);
  }

  error(message: string, traceId: string) {
    this.logger.error(`${message} [TraceID: ${traceId}]`);
  }
}
