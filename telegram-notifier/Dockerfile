ARG NODE_VERSION=lts
FROM node:${NODE_VERSION} as build

WORKDIR /app

COPY package.json *.lock ./
RUN yarn install --frozen-lockfile --non-interactive && yarn cache clean

COPY . .
RUN yarn build

# ---

ARG NODE_VERSION=lts
FROM node:${NODE_VERSION}

WORKDIR /app

ENV NODE_ENV production
ENV ALWATR_DEBUG *
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80

COPY package.json *.lock ./
RUN yarn install --frozen-lockfile --non-interactive --production && yarn cache clean

COPY --from=build /app/dist/ .
CMD ["dist/index.js"]
