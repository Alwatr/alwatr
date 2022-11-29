ARG NODE_VERSION=lts
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

ARG DIST=dist

FROM ghcr.io/alimd/nginx:${NGINX_VERSION}

COPY --from=build /app .

RUN ls
