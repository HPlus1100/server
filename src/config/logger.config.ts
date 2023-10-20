import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

// Winston 로거 인스턴스를 생성합니다.
const logger = winston.createLogger({
  level: 'info', // 로그 레벨 설정
  format: winston.format.combine(
    winston.format.timestamp(), // 타임스탬프 포맷
    winston.format.json(), // 로그를 JSON 형태로 출력
    winston.format.colorize(), // 로그에 색상 추가
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

// 프로덕션 환경에서 CloudWatch 로깅을 추가합니다.
if (process.env.NODE_ENV === 'production') {
  const cloudwatchConfig = {
    logGroupName: process.env.CLOUDWATCH_GROUP_NAME, // 환경 변수에서 로그 그룹 이름을 가져옵니다.
    logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`, // 로그 스트림 이름을 설정합니다.
    awsAccessKeyId: process.env.CLOUDWATCH_ACCESS_KEY, // AWS 접근 키를 설정합니다.
    awsSecretKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY, // AWS 비밀 키를 설정합니다.
    awsRegion: process.env.CLOUDWATCH_REGION, // AWS 리전을 설정합니다.
    messageFormatter: ({ level, message, additionalInfo }) => `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`, // 로그 메시지 형식을 설정합니다.
  };

  // CloudWatch 전송을 위한 새로운 Winston CloudWatch 인스턴스를 추가합니다.
  logger.add(new WinstonCloudWatch(cloudwatchConfig));
}

export default logger; // 이 로거를 다른 파일에서 사용할 수 있도록 내보냅니다.
