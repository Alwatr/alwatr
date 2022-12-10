import {createLogger} from '@alwatr/logger';

export const logger = createLogger('comment');

export const config = {
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    allowAllOrigin: true,
    token: process.env.TOKEN ?? 'ACCSESS_TOKEN',
  },
  storage: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    token: process.env.STORAGE_TOKEN ?? 'ACCSESS_TOKEN',
  },
};

logger.logProperty('config', {...config, token: '***'});
