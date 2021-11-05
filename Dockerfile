FROM node:14

RUN mkdir -p /front/app
WORKDIR /front/app
COPY . /front/app

RUN npm --v && ls

RUN npm install


RUN npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]
