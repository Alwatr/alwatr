ARG NODE_VERSION=12

FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

RUN apk add --no-cache wget tar

# Download folder
ENV POLYFILL_VERSION 4.50.1
RUN wget -O- https://github.com/Financial-Times/polyfill-service/archive/refs/tags/v${POLYFILL_VERSION}.tar.gz
RUN tar -xz --strip-components=1

RUN npm install
RUN npm build
