ARG NODE_VERSION=lts
ARG NGINX_VERSION=1.0.0-1.23-alpine

FROM docker.io/library/node:${NODE_VERSION} as build

WORKDIR /app

COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive; \
    else \
      yarn install --non-interactive; \
    fi;

COPY . .
RUN yarn build

FROM ghcr.io/alimd/nginx:${NGINX_VERSION}


ARG DIST=dist
COPY --from=build /app/${DIST} .

RUN ls -lahF
