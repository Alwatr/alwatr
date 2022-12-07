import {createLogger} from '@alwatr/logger';

export const logger = createLogger('nanoservice-starter');

export const config = {
  host: process.env.HOST ?? '0.0.0.0',
  port: process.env.PORT != null ? +process.env.PORT : 80,
};

logger.logProperty('config', config);
