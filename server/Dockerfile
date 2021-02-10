FROM node:12

RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 4000

## docker-compose-wait used to wait for postgres to be ready
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm run start