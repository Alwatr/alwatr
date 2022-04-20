/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {createLogger} from '@alwatr/logger';
import {isNumber} from '@alwatr/math';
import {config as loadDotEnv} from 'dotenv';

loadDotEnv();

export const config = {
  host: process.env.HOST ?? '0.0.0.0',
  port: isNumber(process.env.PORT) ? +process.env.PORT! : 8000,
};

export const logger = createLogger('microservice');

logger.logProperty('config', config);
