# Builder 이미지 정의
FROM node:20.3.0-alpine AS builder
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# Runner 이미지 정의 (최종 실행 이미지)
FROM nginx:stable-alpine

# Vue 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# custom nginx.conf 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
