import {createLogger} from '@alwatr/logger';

export const logger = createLogger('salavat-api');

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    allowAllOrigin: true,
    accessToken: process.env.ACCESS_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  storage: {
    path: process.env.STORAGE_PATH,
    name: process.env.STORAGE_NAME ?? 'salavat',
    saveBeautiful: true,
  },
};

logger.logProperty('config', config);
