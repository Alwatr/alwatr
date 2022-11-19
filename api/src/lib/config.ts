import {createLogger} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';

export const config = {
  port: isNumber(process.env.PORT) ? +process.env.PORT! : 8000,
  host: process.env.HOST ?? '127.0.0.1',
  storageServerHost: process.env.STORAGE_API_DOMAIN ?? 'http://127.0.0.1',
  storageName: process.env.STORAGE_NAME ?? 'job-list',
  storageToken: process.env.STORAGE_TOKEN,
};

if (config.storageToken === undefined) {
  throw new Error('storage_token_required');
}

export const logger = createLogger('flight-finder-api');

logger.logProperty('config', config);
