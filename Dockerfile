FROM node:14-alpine as build-stage

RUN mkdir -p /front/app
WORKDIR /front/app
COPY . /front/app

RUN npm install & npm build

EXPOSE 8080
CMD [ "node", "server.js" ]
