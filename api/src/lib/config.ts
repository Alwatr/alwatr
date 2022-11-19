import {createLogger} from '@alwatr/logger';

const storageToken = process.env.STORAGE_TOKEN;

if (storageToken === undefined) {
  throw new Error('storage_token_required');
}

export const config = {
  port: process.env.PORT != null ? +process.env.PORT : 8000,
  host: process.env.HOST ?? '127.0.0.1',
  storageHost: process.env.STORAGE_HOST ?? 'http://127.0.0.1',
  storageName: process.env.STORAGE_NAME ?? 'job-list',
  storageToken: storageToken,
};

export const logger = createLogger('flight-finder-api');

logger.logProperty('config', config);
