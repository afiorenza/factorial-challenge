FROM node:20.7.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN yarn

RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["yarn", "start"]
