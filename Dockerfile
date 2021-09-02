FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#COPY server.js .

RUN ls

COPY . .
#EXPOSE 8087 

RUN ls 

#RUN npm run build 

RUN npm run build --prod
#CMD [ "npm", "start" ]

FROM nginx:alpine
COPY --from=node /app/dist/restaurant-front /usr/share/nginx/html
