ARG NODE_VERSION=lts
ARG DIST=dist
FROM node:${NODE_VERSION} as build

WORKDIR /app

COPY package.json *.lock ./
RUN if [ -f *.lock ]; then \
      yarn install --frozen-lockfile --non-interactive; \
    else \
      yarn install --non-interactive; \
    fi;

COPY . .
RUN yarn build
RUN ls -lahF ${DIST}

# ---

ARG NODE_VERSION=lts
ARG DIST=dist
FROM node:${NODE_VERSION}

WORKDIR /app

ENV NODE_ENV production
ENV ALWATR_DEBUG *
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80
CMD index.js

COPY --from=build /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production && yarn cache clean

COPY --from=build /app/${dist} .
