FROM node:20-alpine

COPY . .

WORKDIR /

EXPOSE ${PORT}

RUN npm install && npm cache clean --force  

CMD [ "npm", "run", "start:dev" ]
