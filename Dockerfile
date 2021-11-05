FROM node:14

RUN mkdir -p /front/app
WORKDIR /front/app
COPY . /front/app

RUN sudo npm install

RUN npm --v && ls

RUN npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]
