FROM node:16
WORKDIR /node-docker-duarte
COPY ./src /node-docker-duarte/src
COPY ./.env /node-docker-duarte
COPY package.json /node-docker-duarte
RUN npm install
