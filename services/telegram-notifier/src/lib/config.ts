import {createLogger} from '@alwatr/logger';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

if (telegramBotToken == undefined) {
  throw new Error('telegram bot token required, TELEGRAM_BOT_TOKEN="ACCSESS_TOKEN" yarn start');
}

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8001,
    token: process.env.TOKEN ?? 'ACCSESS_TOKEN',
  },
  telegramBot: {
    token: telegramBotToken,
  },
};

export const logger = createLogger('telegram-notifier');

logger.logProperty('config', config);
