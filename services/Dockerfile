ARG NODE_VERSION=19
FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app


# COPY package.json *.lock ./

COPY . .
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive; \
    else \
      yarn install --non-interactive; \
    fi;

ARG SOURCE_PATH
RUN set -ex;\
    if [ -z "${SOURCE_PATH}" ]; then\
      echo 'SOURCE_PATH not defined'>&2;\
      exit 1;\
    fi;

RUN  yarn build:ts;

RUN cd "${SOURCE_PATH}";\
    pwd; ls -lahF;\
    yarn build;\
    ls -lAh dist;

RUN  cd /app;\
    rm -rf node_modules;\
    yarn install --frozen-lockfile --non-interactive --production;

# ---

FROM docker.io/library/node:${NODE_VERSION}-alpine as app

WORKDIR /app

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "index.js"]

ENV NODE_ENV production
ENV ALWATR_DEBUG *
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/${SOURCE_PATH}/dist/ ./
RUN ls -lAhF
