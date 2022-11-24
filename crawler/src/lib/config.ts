import {createLogger} from '@alwatr/logger';

export const config = {
  storage: {
    host: process.env.STORAGE_HOST ?? 'http://127.0.0.1:9000',
    name: process.env.STORAGE_NAME ?? 'job',
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  notifier: {
    host: process.env.NOTIFIER_HOST ?? 'http://127.0.0.1:8001',
    to: process.env.NOTIFIER_TO ?? 'all',
    token: process.env.NOTIFIER_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
};

export const logger = createLogger('flight-finder-crawler');

logger.logProperty('config', config);
