cs# Logging

- 학습목표
  - 로깅에 대한 전반적인 사전 학습
  - 로깅 이유, 방법, 포맷 등을 논의

## Logging

### What?

> 로깅은 로그파일에 정보를 기록하는 프로세스

### why do logging?

- 심각한 에러가 나타났을때 **_원인을 파악_**하고

  데이터를 남기기 위해 앞으로 그런일을 사전에 방지

- 항상 디버깅이 되는것은 아님. log를 남겨서 작업도 가능

- log를 심각한 에러 관련 데이터만 남길뿐 아니라, **_데이터로도 사용가능_**.

  (사용자가 검색한 키워드를 이용한 추천검색어)

### why is important?

- 똑같은 에러가 발생했을 때 원인 파악이 힘듬

  -> 효율적으로 일을 하는 게 아님

## 로깅 방법

winston 라이브러리를 사용

1. 로그 수준 정하기

   (DEBUG, INFO, WARN, ERROR, CRITICAL) 에 따라

   심각도와 중요성을 분류하여 어느 레벨로 잡을건지 정해야함

   - ChatGPT를 이용한 Winston의 파일전송 (log level 구별)

   ```ts
   const winston = require('winston');

   const logger = winston.createLogger({
     levels: winston.config.syslog.levels,
     transports: [
       new winston.transports.File({
         filename: 'error.log',
         level: 'error', // Only log messages with 'error' level or higher
       }),
       new winston.transports.File({
         filename: 'combined.log',
         level: 'info', // Log messages with 'info' level or higher
       }),
     ],
   });

   // This will be logged only in combined.log
   logger.info('This is an info log');

   // This will be logged in both combined.log and error.log
   logger.error('This is an error log');
   ```

2. formatting 정하기

   구조화된 로깅을 사용해야함

   json 형태로 데이터를 더 쉽게 쿼리, 필터링 및 분석할 수 있는 형태로 작업함

   - 로그에 민감한 정보들은 나오지 않도록 해야함

     내용이 출력이 될 때 공격자에게 유용하다고 판단되면 출력되면 안됨

3. storage는 어떻게 할건지

Cloud Watch를 사용하면 보관기간에서 도움을 받을 수 있음

보안적인 부분도 AWS IAM을 이용하여 권한을 제어할 수 있음

비용적인 부분도 고려해볼 요소

- 참고링크

  https://apoorv-tomar.medium.com/logging-why-logging-is-important-9ef989867a08
