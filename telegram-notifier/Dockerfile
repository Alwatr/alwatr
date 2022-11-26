ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . .
RUN yarn build

ENV PORT 80
ENV TELEGRAM_BOT_TOKEN ${TELEGRAM_BOT_TOKEN}
ENV TOKEN ${NOTIFIER_TOKEN}
ENV NODE_ENV production

EXPOSE 80

CMD ["dist/index.js"]
