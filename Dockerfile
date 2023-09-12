# Node.js 20 이미지를 기반으로 사용
FROM node:20

# 작업 디렉토리를 설정 - 컨테이너 내부 경로
WORKDIR /app

# 호스트 머신에서 컨테이너로 package.json 및 package-lock.json 파일을 복사
COPY package*.json ./

# 애플리케이션을 빌드
RUN npm install

# 소스 코드를 현재 디렉토리에서(호스트?) 컨테이너로 복사
COPY . .

# build
RUN npm run build

# 포트를 노출 (Nest.js 애플리케이션에서 사용 중인 포트로 변경해야 함)
EXPOSE 3000

# 실행
CMD [ "npm", "start" ]