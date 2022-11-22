import {createLogger} from '@alwatr/logger';

export const logger = createLogger('flight-finder-crawler');

const storageToken = process.env.STORAGE_TOKEN;
const notifierToken = process.env.NOTIFIER_TOKEN;

if (storageToken === undefined) {
  logger.accident('config', 'token_required', 'Use NOTIFIER_TOKEN=token STORAGE_TOKEN=token yarn serve');
  throw new Error('token_required');
}

export const config = {
  storage: {
    host: process.env.STORAGE_HOST ?? 'http://127.0.0.1:80',
    name: process.env.STORAGE_NAME ?? 'job',
    token: storageToken,
  },
  notifier: {
    host: process.env.NOTIFIER_HOST ?? 'http://127.0.0.1:8001',
    to: process.env.NOTIFIER_TO ?? 'all',
    token: notifierToken!,
  },
};

logger.logProperty('config', config);
