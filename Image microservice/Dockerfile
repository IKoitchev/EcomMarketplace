FROM node:16-alpine as builder

WORKDIR /project
COPY package*.json ./ 
RUN npm install
COPY . .
#install dependancies

EXPOSE 3010

CMD ["npm", "run", "start"]