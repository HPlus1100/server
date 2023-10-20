import { createLogger, format, transports, Logger } from 'winston';
import * as appRoot from 'app-root-path';

export function createAppLogger(): Logger {
  const options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
      ),
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    },
  };

  // 환경별 로그 설정
  const logger = createLogger({
    transports: [new transports.File(options.file)],
  });

  // 개발 환경에서는 콘솔에도 로그 출력
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console(options.console));
  }

  return logger;
}
