FROM node:20.7.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]
