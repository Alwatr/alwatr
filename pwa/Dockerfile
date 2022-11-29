ARG NODE_VERSION=18
ARG NGINX_VERSION=1.0.0-1.23-alpine

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

COPY package.json ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . .
RUN yarn build

FROM ghcr.io/alimd/nginx:${NGINX_VERSION}

COPY --from=build /app .

RUN ls
