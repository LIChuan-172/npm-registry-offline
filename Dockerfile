FROM node:bookworm

USER root

RUN mkdir /app

WORKDIR /app

COPY package.json package-lock.json /app/

RUN cd /app && npm install

COPY . /app/

EXPOSE 3001

CMD ["npm", "run", "dev"]
