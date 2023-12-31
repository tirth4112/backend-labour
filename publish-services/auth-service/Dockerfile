# Dockerfile for /publish-services/auth-services

FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "app.js"]
