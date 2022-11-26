import {createLogger} from '@alwatr/logger';

export const logger = createLogger('storage-server');

export const config = {
  host: process.env.HOST ?? '0.0.0.0',
  port: process.env.PORT != null ? +process.env.PORT : 9000,
  storagePath: process.env.STORAGE_PATH ?? 'db',
  token: process.env.TOKEN ?? 'YOUR_SECRET_TOKEN',
};

logger.logProperty('config', {...config, token: '***'});
