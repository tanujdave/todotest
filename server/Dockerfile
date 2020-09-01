FROM node:12

WORKDIR /opt/app

COPY package*.json ./

RUN yarn

COPY . /opt/app

EXPOSE 3001
CMD yarn watch