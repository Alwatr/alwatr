import {createLogger} from '@alwatr/logger';

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8001,
  },
  storage: {
    host: process.env.STORAGE_HOST ?? 'http://127.0.0.1:9000',
    name: process.env.STORAGE_NAME ?? 'job',
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
};

export const logger = createLogger('flight-finder-api');

logger.logProperty('config', config);
