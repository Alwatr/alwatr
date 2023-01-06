ARG NODE_VERSION=19
FROM docker.io/library/node:${NODE_VERSION}-alpine as builder

WORKDIR /app

COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --immutable; \
    else \
      yarn install; \
    fi;

COPY . .
RUN yarn build && \
    yarn workspaces focus --all --immutable && \
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

# COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./
RUN ls -lahF
