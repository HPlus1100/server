import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const traceId = req.headers['x-trace-id'] || 'N/A';

    this.loggerService.log(
      `Incoming request to ${req.method} ${req.originalUrl}`,
      traceId,
    );

    res.on('finish', () => {
      this.loggerService.log(
        `Response from ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`,
        traceId,
      );
    });

    next();
  }
}
