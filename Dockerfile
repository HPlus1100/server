# Node.js 20 이미지를 기반으로 사용
FROM node:20

# 작업 디렉토리를 설정 - 컨테이너 내부 경로
WORKDIR /app

RUN apk update && apk --no-cache add libaio libnsl libc6-compat curl && \
    cd /tmp && \
    curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basic-linuxx64.zip -SL && \
    unzip instantclient-basiclite.zip && \
    mv instantclient*/ /usr/lib/instantclient && \
    rm instantclient-basiclite.zip && \
    ln -s /usr/lib/instantclient/libclntsh.so.21.1 /usr/lib/libclntsh.so && \
    ln -s /usr/lib/instantclient/libocci.so.21.1 /usr/lib/libocci.so && \
    ln -s /usr/lib/instantclient/libociicus.so /usr/lib/libociicus.so && \
    ln -s /usr/lib/instantclient/libnnz21.so /usr/lib/libnnz21.so && \
    ln -s /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1 && \
    ln -s /lib/libc.so.6 /usr/lib/libresolv.so.2 && \
    ln -s /lib64/ld-linux-x86-64.so.2 /usr/lib/ld-linux-x86-64.so.2 

ENV LD_LIBRARY_PATH /usr/lib/instantclient

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

