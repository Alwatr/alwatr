import {createLogger} from '@alwatr/logger';

export const logger = createLogger('telegram-notifier');

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramBotWebhookDomain = process.env.TELEGRAM_BOT_WEBHOOK_DOMAIN;

if (telegramBotToken == null) {
  throw new Error('telegram bot token required, TELEGRAM_BOT_TOKEN="YOUR_SECRET_TOKEN" yarn start');
}
if (telegramBotWebhookDomain == null) {
  throw new Error('telegram bot webhook url required, TELEGRAM_BOT_WEBHOOK_DOMAIN="YOUR_WEBHOOK_DOMAIN" yarn start');
}

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8001,
    accessToken: process.env.ACCESS_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  storage: {
    path: process.env.STORAGE_PATH ?? 'db',
    name: 'notifier-storage',
  },
  telegramAdmin: {
    debugNotifyToken: 'debug007',
  },
  telegramBot: {
    token: telegramBotToken,
    webhookDomain: telegramBotWebhookDomain,
  },
};

logger.logProperty?.('config', config);
