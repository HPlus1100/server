# Winston

## A logger for just about everything.

- 학습목표
  - 윈스턴에 대한 전반적인 사전 학습
  - Keywords

### Motivation

Multiple Transports를 지원하는 비동기 로깅 라이브러리

- transports : 속성 값으로 설정 정보를 전달할 수 있으며, 로그가 기록되는 저장소를 말함

winston은 로그를 파일로 저장하면서, 동시에 화면에 출력할 수 있음

#### Transports

로깅하는 방식을 transports라고 함
winston에는 내장 네트워킹과 파일 입출력 등 사용가능한 trasnports가 있다.

#### 로깅 수준 (Logging Levels)

winston의 로깅 수준은 RFC5424에 명시된 심각도 수준에 따라 설정되어있다.
각 수준은 단계별로 우선 순위가 부여되며, 어떤 정보까지 출력할 것인지 결정한다.
하위 수준은 상위 수준을 모두 포함하여 출력한다.

```js
{
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
}
// Heightest level to Lowest level
```

#### winston 설치 - OSX

```
$ npm install winston --save
```

#### Quick Start

```js
const { createLogger, format, transports } = require('../');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'your-service-name' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({ filename: 'quick-start-error.log', level: 'error' }),
    new transports.File({ filename: 'quick-start-combined.log' }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

// ***************
// Allows for JSON logging
// ***************

logger.log({
  level: 'info',
  message: 'Pass an object and this works',
  additional: 'properties',
  are: 'passed along',
});

logger.info({
  message: 'Use a helper method if you want',
  additional: 'properties',
  are: 'passed along',
});

// ***************
// Allows for parameter-based logging
// ***************

logger.log('info', 'Pass a message and this works', {
  additional: 'properties',
  are: 'passed along',
});

logger.info('Use a helper method if you want', {
  additional: 'properties',
  are: 'passed along',
});

// ***************
// Allows for string interpolation
// ***************

// info: test message my string {}
logger.log('info', 'test message %s', 'my string');

// info: test message 123 {}
logger.log('info', 'test message %d', 123);

// info: test message first second {number: 123}
logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });

// prints "Found error at %s"
logger.info('Found %s at %s', 'error', new Date());
logger.info('Found %s at %s', 'error', new Error('chill winston'));
logger.info('Found %s at %s', 'error', /WUT/);
logger.info('Found %s at %s', 'error', true);
logger.info('Found %s at %s', 'error', 100.0);
logger.info('Found %s at %s', 'error', ['1, 2, 3']);

// ***************
// Allows for logging Error instances
// ***************

logger.warn(new Error('Error passed as info'));
logger.log('error', new Error('Error passed as message'));

logger.warn('Maybe important error: ', new Error('Error passed as meta'));
logger.log('error', 'Important error: ', new Error('Error passed as meta'));

logger.error(new Error('Error as info'));
```

### Keywords

- Transports: a storage device for logs
  each instance of a winston logger can have multiple transports configured at different levels

- Logging Levels: the severity ordering specified by RFC5424: severity of all levels is assumed to be numerically ascending from most important to least important

  **로그 레벨에 따라 다른 transport 를 이용하여 나눠 저장할 수 있음**

### 참고링크

https://github.com/winstonjs/winston
