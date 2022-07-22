import {createLogger} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';

export const config = {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  port: isNumber(process.env.PORT) ? +process.env.PORT! : 8000,
};

export const logger = createLogger('micro-service-starter');

logger.logProperty('config', config);
