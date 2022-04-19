import {config as loadDotEnv} from 'dotenv';

loadDotEnv();

export const config = {
  host: process.env.HOST ?? '0.0.0.0',
  port: process.env.PORT ?? 8000,
};
