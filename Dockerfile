FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#COPY server.js .

COPY . ./app
#EXPOSE 8087 

RUN npm start
#CMD [ "npm", "start" ]
