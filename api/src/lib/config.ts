import {createLogger} from '@alwatr/logger';

const storageToken = process.env.STORAGE_TOKEN;

if (storageToken === undefined) {
  throw new Error('storage_token_required');
}

export const config = {
  nanoServer: {
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    host: process.env.HOST ?? '127.0.0.1',
  },
  storage: {
    host: process.env.STORAGE_HOST ?? 'http://127.0.0.1',
    name: process.env.STORAGE_NAME ?? 'job',
    token: storageToken,
  }
};

export const logger = createLogger('flight-finder-api');

logger.logProperty('config', config);
