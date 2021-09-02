FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#COPY server.js .

COPY . .
#EXPOSE 8087 

#RUN npm run build 

RUN npm build --prod
#CMD [ "npm", "start" ]

FROM nginx:alpine
COPY --from=node /usr/src/app/dist/restaurant-front /usr/share/nginx/html
