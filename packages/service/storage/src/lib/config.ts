import {createLogger} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';

export const config = {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  port: isNumber(process.env.PORT) ? +process.env.PORT! : 80,
  storagePath: process.env.STORAGE_PATH ?? 'db',
  dataModelName: process.env.DATA_MODEL_NAME ?? 'data-model-list',
};

export const logger = createLogger('service-storage');

logger.logProperty('config', config);
