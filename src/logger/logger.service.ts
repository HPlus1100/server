import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const format = winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level}] : ${message} `;
        if (metadata) {
          msg += JSON.stringify(metadata);
        }
        return msg;
      }),
    );

    this.logger = winston.createLogger({
      level: 'info',
      format: format,
      transports: [new winston.transports.Console()],
    });
    const cloudWatchConfig = {
      logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
      logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
      awsRegion: process.env.AWS_REGION,
    };
    const cloudWatchHelper = new WinstonCloudwatch(cloudWatchConfig);

    this.logger.add(cloudWatchHelper);
  }

  log(message: string, traceId: string): void {
    this.logger.info(`${message} [TraceID: ${traceId}]`);
  }

  error(message: string, traceId: string): void {
    this.logger.error(`${message} [TraceID: ${traceId}]`);
  }
}
