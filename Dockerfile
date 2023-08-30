FROM node:bookworm

USER root

RUN mkdir /app

WORKDIR /app

COPY package.json package-lock.json /app/

RUN cd /app && npm install

COPY . /app/

RUN npm run build

CMD ["node", "dist/index.js"]
