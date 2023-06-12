import {createLogger} from '@alwatr/logger';

export const logger = createLogger('telegram-day-countdown');

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramBotWebhookDomain = process.env.TELEGRAM_BOT_WEBHOOK_DOMAIN;

if (telegramBotToken == null) {
  throw new Error('telegram bot token required, TELEGRAM_BOT_TOKEN="YOUR_SECRET_TOKEN" yarn start');
}
if (telegramBotWebhookDomain == null) {
  throw new Error('telegram bot webhook url required, TELEGRAM_BOT_WEBHOOK_DOMAIN="YOUR_WEBHOOK_DOMAIN" yarn start');
}

process.env.TZ = 'Asia/Tehran';

export const config = {
  telegram: {
    token: telegramBotToken,
    username: process.env.TELEGRAM_BOT_USERNAME,
    webhookDomain: telegramBotWebhookDomain,
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT ? +process.env.PORT : 8080,
  },
  bot: {
    adminToken: process.env.ADMIN_TOKEN ?? 'admin-token',
    notifyTimestamp: 9,
  },
  storageClient: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
};

logger.logProperty?.('config', config);
