ARG NODE_VERSION=20
ARG ALWATR_NGINX_VERSION=1.7.0-1.24-alpine

FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

ENV NODE_ENV production

RUN apk add --no-cache git

# Install dependencies
COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive --production false; \
    else \
      yarn install --non-interactive --production false; \
    fi;

COPY . .

# Reinstall to link internal packages
RUN yarn install --frozen-lockfile --non-interactive --production false;

# Build all ts files
RUN yarn build:ts

# Build target package
ARG PACKAGE_SOURCE
RUN set -ex;\
    if [ -z "${PACKAGE_SOURCE}" ]; then\
      echo 'PACKAGE_SOURCE not defined'>&2;\
      exit 1;\
    fi;
RUN set -ex;\
    cd "${PACKAGE_SOURCE}"; pwd; ls -lahF;\
    yarn build;\
    cd dist; pwd; ls -lahF;

# ---

FROM ghcr.io/alimd/nginx-pwa:${ALWATR_NGINX_VERSION} as nginx
# Copy builded files from last stage
ARG PACKAGE_SOURCE
COPY --from=builder /app/${PACKAGE_SOURCE}/dist/ ./
RUN pwd; ls -lAhF;
