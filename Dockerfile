FROM node:10

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

#COPY server.js .

EXPOSE 8087 

CMD [ "npm", "start" ]