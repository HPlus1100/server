import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  // (Nestjs가 HTTP요청을 처리하기위한)미들웨어의 설계를 따라 Response를 명시해야됨. 사용도안하는데..
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['x-trace-id']) {
      req.headers['x-trace-id'] = uuidv4(); // 존재하지 않는 경우 새 TraceID 할당
    }
    next();
  }
}
