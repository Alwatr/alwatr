import {createLogger} from '@alwatr/logger';

export const config = {
  storage: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    name: process.env.STORAGE_NAME ?? 'job',
    token: process.env.STORAGE_TOKEN ?? 'ACCSESS_TOKEN',
  },
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    token: process.env.TOKEN ?? 'ACCSESS_TOKEN',
  },
};

export const logger = createLogger('flight-finder-api');

logger.logProperty('config', config);
