import {createLogger} from '@alwatr/logger';

export const logger = createLogger('telegram-notifier');

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

if (telegramBotToken == undefined) {
  throw new Error('telegram bot token required, TELEGRAM_BOT_TOKEN="YOUR_SECRET_TOKEN" yarn start');
}

export const config = {
  telegramBot: {
    token: telegramBotToken,
    username: process.env.TELEGRAM_BOT_USERNAME,
    webhookDomain: 'https://89c2-2a01-7e00-00-f03c-93ff-fe88-9fb9.eu.ngrok.io/',
  },
  adminToken: process.env.ADMIN_TOKEN ?? 'admin-token',
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
