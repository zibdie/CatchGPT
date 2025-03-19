FROM node:18-alpine

RUN apk add --no-cache sqlite python3 g++ make

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir -p /app/data && chown -R node:node /app/data

RUN npm run build

EXPOSE 3000

USER node

CMD ["npm", "start"] 