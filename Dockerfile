FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#COPY server.js .

COPY . .
#EXPOSE 8087 

#RUN npm run build

RUN npm start
#CMD [ "npm", "start" ]
