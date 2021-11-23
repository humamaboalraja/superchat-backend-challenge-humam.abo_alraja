FROM node:14.15.4-alpine3.10 AS base

WORKDIR /app
RUN apk update && apk add bash

COPY ./ ./


RUN yarn install --frozen-lockfile 

RUN yarn prisma:migrate
RUN yarn prisma:generate

RUN yarn build
RUN yarn data:seed
CMD [ "yarn", "dev" ]
