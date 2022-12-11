import {createLogger} from '@alwatr/logger';

export const logger = createLogger('storage-server');

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 9000,
    accessToken: process.env.ACCESS_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  storage: {
    path: process.env.STORAGE_PATH ?? 'db',
    saveDebounce: process.env.SAVE_DEBOUNCE != null ? +process.env.SAVE_DEBOUNCE : 100,
  },
};

logger.logProperty('config', config);
