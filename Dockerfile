FROM node:14

RUN mkdir -p /front/app
WORKDIR /front/app
COPY . /front/app

RUN npm install & npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]
