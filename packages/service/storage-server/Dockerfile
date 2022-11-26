ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine

LABEL maintainer="S. Ali Mihandoost <ali.mihandoost@gmail.com>"

WORKDIR /app

# USER node
# COPY --chown=node:node

COPY package.json ./

RUN yarn install --frozen-lockfile --non-interactive

COPY . .

RUN yarn build

ENV PORT=80
ENV TOKEN=$STORAGE_TOKEN
ENV NODE_ENV=production

EXPOSE 80

CMD ["dist/index.js"]
