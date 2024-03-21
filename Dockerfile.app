FROM node:20-alpine

COPY . .

WORKDIR /

EXPOSE ${PORT}

RUN npm install

CMD [ "npm", "run", "start:dev" ]
