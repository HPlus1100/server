## Description
Nestjs 서버

# 01-ci-ci-pipeline

## how to run in local

```bash

npm ci
npm run start:alpha

```

## health-check

```bash

curl -Uri 'http://localhost:3001/health-check' -Method GET

```

## todo

```bash

curl -Uri 'http://localhost:3001/todo' -Method GET
 
curl -Uri 'http://localhost:3001/todo' -Method POST -Headers @{'Content-Type' = 'application/json'} -Body '{"id" : "1", "name": "test"}'

```