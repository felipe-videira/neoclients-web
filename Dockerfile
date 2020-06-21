FROM node:alpine

RUN mkdir -p /usr/app/web
WORKDIR /usr/app/web

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /usr/app/web
COPY package-lock.json /usr/app/web

RUN npm install
RUN npm install -g @vue/cli 

COPY . /usr/app/web