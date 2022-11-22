import {createLogger} from '@alwatr/logger';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

if (telegramBotToken == undefined) {
  throw new Error('TELEGRAM_BOT_TOKEN required');
}

export const config = {
  nanoServer: {
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    host: process.env.HOST ?? '127.0.0.1',
  },
  telegramBot: {
    token: telegramBotToken,
  },
};

export const logger = createLogger('telegram-notifier');

logger.logProperty('config', config);
