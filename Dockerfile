# Node.js 20 이미지를 기반으로 사용
FROM node:20-alpine

# 경로 생성 후 작업 디렉토리를 설정 - 컨테이너 내부 경로
RUN mkdir -p /var/app
WORKDIR /var/app

# 소스 코드를 현재 디렉토리에서(호스트?) 컨테이너로 복사
COPY . .

# 애플리케이션을 빌드
RUN npm ci
RUN npm run build

# 포트를 노출 (Nest.js 애플리케이션에서 사용 중인 포트로 변경해야 함)
EXPOSE 3000

# 실행
 CMD [ "node", "dist/main.js" ]