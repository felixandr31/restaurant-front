FROM node:9.2.1
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/
COPY package.json .
RUN npm install
COPY . .

EXPOSE 4200
CMD ["npm", "run", "start"]
RUN ps -eaf

