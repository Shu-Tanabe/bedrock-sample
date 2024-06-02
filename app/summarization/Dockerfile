FROM node:20.12-bullseye-slim as dev

RUN apt-get update && \
    apt-get install -y procps make gcc g++ python3 curl

WORKDIR /app

COPY . .
RUN yarn install
ENV HOST 0.0.0.0

CMD ["yarn", "run", "dev"]