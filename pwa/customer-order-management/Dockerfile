ARG NODE_VERSION=19
ARG NGINX_VERSION=1.0.0-1.23-alpine

FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive; \
    else \
      yarn install --non-interactive; \
    fi;

COPY . .
RUN yarn build && \
    ls -lAh dist

FROM ghcr.io/alimd/nginx:${NGINX_VERSION} as nginx

ARG DIST=dist
COPY --from=build /app/${DIST} .

RUN ls -lahF
