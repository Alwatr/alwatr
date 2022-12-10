ARG NODE_VERSION=19
ARG NGINX_VERSION=1.0.0-1.23-alpine

FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

# Install dependencies
COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive; \
    else \
      yarn install --non-interactive; \
    fi;

COPY . .

# Reinstall to link internal packages
RUN yarn install --frozen-lockfile --non-interactive;

# Build all ts files
RUN  yarn build:ts;

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

# Clean devDependencies
RUN set -ex;\
    pwd;\
    rm -rf node_modules;\
    yarn install --frozen-lockfile --non-interactive --production;

# ---

FROM ghcr.io/alimd/nginx:${NGINX_VERSION} as nginx

EXPOSE 80
# Config nginx template
ENV NGINX_ERROR_LOG_LEVEL=notice \
    NGINX_ACCESS_LOG="/var/log/nginx/access.log json" \
    NGINX_CLIENT_MAX_BODY_SIZE=10m \
    NGINX_SENDFILE=on \
    NGINX_TCP_NOPUSH=off \
    NGINX_TCP_NODELAY=on \
    NGINX_OPEN_FILE_CACHE_VALID=24h \
    NGINX_EXPIRES_HTML=epoch \
    NGINX_EXPIRES_STATIC=max \
    NGINX_EXPIRES_DEFAULT=5m

# Copy builded files from last stage
ARG PACKAGE_SOURCE
COPY --from=builder /app/${PACKAGE_SOURCE}/dist/ ./
RUN pwd; ls -lAhF;
