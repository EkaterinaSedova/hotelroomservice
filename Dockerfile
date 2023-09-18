FROM node:16.18

WORKDIR /hotelservice-be

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]