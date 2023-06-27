ARG NODE_IMAGE=docker.io/library/node:20-alpine
ARG NGINX_IMAGE=ghcr.io/alimd/nginx:1.7.0-1.24-alpine

FROM ${NODE_IMAGE} as builder

WORKDIR /app

ENV NODE_ENV production

ENV HUGO_VERSION =~0.111
RUN apk add --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community --no-cache hugo${HUGO_VERSION}

# Install dependencies
COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive --production false; \
    else \
      yarn install --non-interactive --production false; \
    fi;

COPY . .

RUN yarn build

# ---

FROM ${NGINX_IMAGE} as nginx

COPY --from=builder /app/public/ ./
RUN pwd; ls -lAhF;
