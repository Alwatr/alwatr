import {createLogger} from '@alwatr/logger';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

if (telegramBotToken == undefined) {
  throw new Error('TELEGRAM_BOT_TOKEN required');
}

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8002,
    token: process.env.TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  telegramBot: {
    token: telegramBotToken,
  },
};

export const logger = createLogger('telegram-notifier');

logger.logProperty('config', config);
