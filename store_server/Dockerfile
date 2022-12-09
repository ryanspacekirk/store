FROM node:alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install -g nodemon@2.0.15

RUN npm install

EXPOSE 8081

CMD ["npm", "start"]