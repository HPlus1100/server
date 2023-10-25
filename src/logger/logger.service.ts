import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    const format = winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
      ),
    );

    this.logger = winston.createLogger({
      level: 'info',
      format: format,
      transports: [new winston.transports.Console()],
    });
    if (!isDevelopment) {
      const cloudWatchConfig = {
        logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
        logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
        awsRegion: process.env.AWS_REGION,
        messageFormatter: ({
          level,
          message,
          additionalInfo,
        }: {
          level: string;
          message: string;
          additionalInfo: JSON;
        }): string =>
          `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
            additionalInfo,
          )}}`,
      };
      const cloudWatchHelper = new WinstonCloudwatch(cloudWatchConfig);
      this.logger.add(cloudWatchHelper);
    }
  }

  log(message: string, traceId: string): void {
    this.logger.info(`${message} [TraceID: ${traceId}]`);
  }

  error(message: string, traceId: string): void {
    this.logger.error(`${message} [TraceID: ${traceId}]`);
  }
}
