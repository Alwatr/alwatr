# Alwatr Accelerated PWA Server

High performance Accelerated NGINX optimized NGINX for serve progressive web applications.

## Usage

The right way of using the alwatr nginx is behind kubernetes ingress or simple edge reverse-proxy, then don't config edge stuff like gzip compression, ssl, etc or even config domain or multiple websites.

```Dockerfile
ARG NODE_VERSION=lts
ARG ALWATR_NGINX_VERSION=1
FROM docker.io/library/node:${NODE_VERSION} as builder
WORKDIR /app
COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive --production false; \
    else \
      yarn install --non-interactive --production false; \
    fi;
COPY . .
RUN yarn build

# ---

FROM ghcr.io/alimd/nginx-pwa:${ALWATR_NGINX_VERSION} as nginx
# Config nginx
ENV NGINX_ACCESS_LOG="/var/log/nginx/access.log json"
# Copy builded files from last stage
COPY --from=builder /app/dist/ ./
RUN pwd; ls -lAhF;
```
