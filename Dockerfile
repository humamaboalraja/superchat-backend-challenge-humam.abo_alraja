FROM node:14.15.4-alpine3.10 AS base

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 5000