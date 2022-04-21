import {createLogger} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';
import {config as loadDotEnv} from 'dotenv';

loadDotEnv();

export const config = {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  port: isNumber(process.env.PORT) ? +process.env.PORT! : 8000,
};

export const logger = createLogger('microservice');

logger.logProperty('config', config);
