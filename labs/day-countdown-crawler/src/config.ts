import {createLogger} from '@alwatr/logger';

export const logger = createLogger('day-countdown-crawler');

export const config = {
  storage: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    name: process.env.STORAGE_NAME ?? 'dayCountdown',
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  api: {
    domain: process.env.API_DOMAIN ?? 'http://127.0.0.1:8000',
    token: process.env.API_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  telegramNotifier: {
    domain: process.env.TELEGRAM_NOTIFIER_DOMAIN ?? '127.0.0.1:8001',
    token: process.env.TELEGRAM_NOTIFIER_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
};

logger.logProperty('config', config);
