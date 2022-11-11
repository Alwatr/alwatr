# Alwatr Accelerated Web Server

High performance, optimized NGINX for serve web applications and api proxy with fast cache.

## Usage

The right way of using the alwatr nginx is behind kubernetes ingress or simple edge reverse-proxy, then don't config edge stuff like gzip compression, ssl, etc or even config domain or multiple websites.

```Dockerfile
FROM ghcr.io/alimd/nginx:1
```

### PWA Dockerfile Sample

```Dockerfile
ARG NODE_VERSION=lts
FROM node:${NODE_VERSION} as build-deps
WORKDIR /app
COPY package.json *.lock .
RUN yarn install --frozen-lockfile --non-interactive && yarn cache clean
COPY . .
RUN yarn build

ARG ALWATR_NGINX_VERSION=1
FROM ghcr.io/alimd/nginx:${ALWATR_NGINX_VERSION}
COPY --from=build-deps /app/dist/ .
```
