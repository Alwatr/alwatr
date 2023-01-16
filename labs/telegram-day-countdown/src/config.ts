import {createLogger} from '@alwatr/logger';

export const logger = createLogger('telegram-notifier');

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

if (telegramBotToken == undefined) {
  throw new Error('telegram bot token required, TELEGRAM_BOT_TOKEN="YOUR_SECRET_TOKEN" yarn start');
}

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8001,
    accessToken: process.env.ACCESS_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  telegramBot: {
    token: telegramBotToken,
  },
  apiService: {
    domain: process.env.API_SERVICE_HOST ?? 'localhost:8000',
    accessToken: process.env.API_SERVICE_ACCESS_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
};

logger.logProperty('config', config);
