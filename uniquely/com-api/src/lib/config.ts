import {createLogger} from '@alwatr/logger';
import {TokenGeneratorConfig} from '@alwatr/token';

export const logger = createLogger('com-api');

export const config = {
  storage: {
    host: process.env.ORDER_STORAGE_HOST ?? '127.0.0.1',
    port: process.env.ORDER_STORAGE_PORT != null ? +process.env.ORDER_STORAGE_PORT : 9000,
    token: process.env.ORDER_STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
    productStorageName: process.env.PRODUCT_STORAGE_NAME ?? 'product',
  },
  token: <TokenGeneratorConfig>{
    secret: process.env.SECRET ?? 'YOUR_SECRET',
    algorithm: 'sha256',
    encoding: 'base64url',
    duration: null,
  },
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    accessToken: process.env.ACCESS_TOKEN ?? 'YOUR_SECRET_TOKEN',
    allowAllOrigin: true,
  },
} as const;

logger.logProperty('config', config);
