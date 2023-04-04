import {createLogger} from '@alwatr/logger';

export const logger = createLogger('telegram-day-countdown');

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramBotWebhookDomain = process.env.TELEGRAM_BOT_WEBHOOK_DOMAIN;

if (telegramBotToken == undefined) {
  throw new Error('telegram bot token required, TELEGRAM_BOT_TOKEN="YOUR_SECRET_TOKEN" yarn start');
}
if (telegramBotWebhookDomain == null) {
  throw new Error('telegram bot webhook url required, TELEGRAM_BOT_WEBHOOK_DOMAIN="YOUR_WEBHOOK_DOMAIN" yarn start');
}

export const config = {
  telegramBot: {
    token: telegramBotToken,
    username: process.env.TELEGRAM_BOT_USERNAME,
    webhookDomain: telegramBotWebhookDomain,
    debugMode: process.env.TELEGRAM_BOT_DEBUG_MODE ? true : undefined,
  },
  admin: {
    adminToken: process.env.ADMIN_TOKEN ?? 'admin-token',
  },
  chatStorage: {
    name: process.env.STORAGE_NAME ?? 'user',
    path: process.env.STORAGE_PATH ?? 'storage',
  },
  configStorage: {
    name: 'config',
    path: process.env.STORAGE_PATH ?? 'storage',
  },
};

logger.logProperty('config', config);
