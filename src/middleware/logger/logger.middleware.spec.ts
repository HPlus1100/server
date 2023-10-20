import { LoggerMiddleware } from './logger.middleware';
import { Test, TestingModule } from '@nestjs/testing';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerMiddleware],
    }).compile();
    middleware = module.get<LoggerMiddleware>(LoggerMiddleware);
  });

  it('should call the next function', () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    middleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
