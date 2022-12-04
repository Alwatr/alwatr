import {createLogger} from '@alwatr/logger';

export const logger = createLogger('storage-server');

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    token: process.env.TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  storage: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    name: process.env.STORAGE_NAME ?? 'comment',
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
};

logger.logProperty('config', {...config, token: '***'});
