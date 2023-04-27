import {TokenGeneratorConfig} from '@alwatr/crypto';
import {createLogger} from '@alwatr/logger';

export const logger = createLogger('com-api');

export const config = {
  storageClient: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET_TOKEN',
  },
  token: <TokenGeneratorConfig>{
    secret: process.env.SECRET ?? 'YOUR_SECRET',
    algorithm: 'sha224',
    encoding: 'base64url',
    duration: null,
  },
  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    accessToken: process.env.ACCESS_TOKEN ?? 'YOUR_SECRET_TOKEN',
    adminToken: process.env.ADMIN_TOKEN ?? 'ADMIN_SECRET_TOKEN',
    allowAllOrigin: true,
  },
  productStoragePrefix: 'product-list-',
  priceStoragePrefix: 'price-list-',
  orderStoragePrefix: 'order-list-',
  productStorageList: (process.env.PRODUCT_STORAGE_LIST ?? 'temp')
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f != ''),
} as const;

logger.logProperty?.('config', config);
