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
RUN ls -lahF ${DIST}

# ---

FROM docker.io/library/node:${NODE_VERSION}

WORKDIR /app

ENV NODE_ENV production
ENV ALWATR_DEBUG *
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80
CMD ["node", "index.js"]

COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production && yarn cache clean

ARG DIST=dist
COPY --from=build /app/${DIST} .
