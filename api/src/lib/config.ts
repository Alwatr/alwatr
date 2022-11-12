import {createLogger} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';

export const config = {
  port: isNumber(process.env.PORT) ? +process.env.PORT! : 80,
  host: process.env.HOST ?? 'localhost',
  storageApiDomain: process.env.STORAGE_API_DOMAIN ?? 'http://localhost',
  storageName: process.env.STORAGE_NAME ?? 'sample',
  storageToken: process.env.STORAGE_TOKEN,
};

export const logger = createLogger('api');

logger.logProperty('config', config);
