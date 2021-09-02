FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#COPY server.js .

EXEC ls

COPY . .
#EXPOSE 8087 

EXEC ls

#RUN npm run build 

RUN npm run build --prod
#CMD [ "npm", "start" ]

FROM nginx:alpine
COPY --from=node /app/dist/restaurant-front /usr/share/nginx/html
