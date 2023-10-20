# CloudWatch

- 학습목표
  - AWS CloudWatch에 대한 전반적인 사전 학습

## Introduce

관찰 가능성과 모니터링을 제공함

시스템 성능 및 리소스 사용의 변화에 대응하는데에도 활용

지표, 이벤트 및 로그 형식으로 데이터를 수집할 수 있음

## Functionality

지표에 따라 통계를 검색하는데 사용할 수 있는 지표를 리포지토리에 저장함

또한 특정 기준이 충족되는 경우

EC2 인스턴스를 시작, 중지 및 종료하기 위한 경보 작업을 사용할 수 있음

그 외에도 개발자는 사용자를 대신하여

Amazon SNS 및 Amazon EC2 Auto Scaling 활동을 트리거하도록 경보를 설정할 수 있음

### 프리 티어

```
- 기본 모니터링 지표는 5분마다 수집됩니다.
- 1분 간격으로 10개의 세부 지표를 모니터링합니다.
- 백만 개의 API 쿼리를 처리할 수 있습니다.

  그러나 GetMetricWidgetImage 및 GetMetricData는 영향을 받지 않습니다.

- 매달 최대 50개의 지표가 포함된 대시보드 3개를 받게 됩니다.
- 경보의 경우 10개의 지표를 얻습니다.
  그러나 고해상도의 경우에는 동일한 작업을 수행할 수 없습니다.
- 맞춤형 이벤트를 제외한 모든 이벤트는 무료 등급에 포함됩니다.
- Logs Insights 쿼리로 스캔한 데이터를 수집, 보관, 저장하기 위한 5GB의 저장 공간이 제공됩니다.
- 매달 하나의 기여자 통찰력 규칙을 받게 됩니다.
- 매달 100회의 카나리아 실행도 제공됩니다.
```

### CloudWatch란?

- AWS 리소스와 AWS에서 실시간으로 실행 중인 애플리케이션을 모니터링 하는 서비스
- 지표를 감시해 알림을 보내거나 임계값을 위반한 경우 모니터링 중인 리소스를 자동으로 변경하는 경보를 생성할 수 있음
- 예를 들어 경보는 인스턴스 중지, auto scaling 및 Amazon SNS 작업 시작, 종료 등으로 구성

![cloudwatch 플로우](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fk8WHo%2Fbtrc7O0yexQ%2F9plJcRIrf1EuTgJ6BScUok%2Fimg.png)

### Namespace, Dimension, Metric, Statistics

![Namespace와 Metric 예제](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fxg1o5%2Fbtrc8g3AF8V%2FiQoXfUW5O0Fkp7AplvF1U1%2Fimg.png)

```
만약, "EC2 인스턴스의 CPU 점유율을 보고 싶다."

"RDS 인스턴스의 CPU 점유율을 보고 싶다." 라고 하면.

EC2, RDS 는 논리적으로 구분하기 위한 Namespace 가 되고

CPU 점유율은 지표값이 됩니다.
```

![Namespace Dimension 예제](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBSh7U%2Fbtrc6SoFR0j%2FKGXX7YHKm4CW5hYEkzvdMK%2Fimg.png)

##### Namespace

    위 표와 같이 AWS 리소스를 가지고 있다고하면 EC2, RDS는 Namespace라고 함

#### Dimension

    인스턴스 개별로 보거나

    인스턴스 유형(type) 으로 묶어서 보거나

    같은 오토스케일링 그룹으로 묶어서 보는 것을 Dimension 이라고 합니다.

#### Metric

    CPU 자원 사용률은 Metric 값이 됩니다.

#### Statics

    자원 사용률에 대한 평균, 최대, 최소 등의 값은 statistics 값이 됩니다.

## 참고링크

https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html

https://aws.plainenglish.io/aws-cloudwatch-introduction-9750af3d91f9

https://nearhome.tistory.com/134
