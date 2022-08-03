FROM node:18-alpine

LABEL maintainer="S. Ali Mihandoost <ali.mihandoost@gmail.com>"

ENV NODE_ENV production

WORKDIR /app

# USER node
# COPY --chown=node:node

COPY package.json ./

RUN yarn install --frozen-lockfile --production=true --non-interactive

COPY dist .

EXPOSE 80

CMD ["dist/index.js"]
