import {createLogger} from '@alwatr/logger';

export const logger = createLogger('service-storage');

export const config = {
  host: process.env.HOST ?? '0.0.0.0',
  port: process.env.PORT != null ? +process.env.PORT : 80,
  storagePath: process.env.STORAGE_PATH ?? 'db',
  token: process.env.TOKEN ?? 'alwatr_110_313',
};

logger.logProperty('config', {...config, token: '***'});
