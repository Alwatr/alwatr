ARG NODE_VERSION=19
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
    rm -rf node_modules && \
    yarn install --frozen-lockfile --non-interactive --production && \
    ls -lahF && \
    ls -lAh dist

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
COPY --from=builder /app/dist/ ./
RUN ls -lahF
