import {createLogger} from '@alwatr/logger';

export const logger = createLogger('com-api');

if (process.env.NODE_ENV === 'production') {
  if (process.env.STORAGE_TOKEN == null) {
    throw new Error('STORAGE_TOKEN is required in production');
  }

  if (process.env.TOKEN_GENERATOR_SECRET == null) {
    throw new Error('TOKEN_GENERATOR_SECRET is required in production');
  }
}

const userDir = 'securage/auth/${userId}' as const;

export const config = {
  storageClient: {
    host: process.env.STORAGE_HOST ?? '127.0.0.1',
    port: process.env.STORAGE_PORT != null ? +process.env.STORAGE_PORT : 9000,
    token: process.env.STORAGE_TOKEN ?? 'YOUR_SECRET',
  },

  token: {
    secret: process.env.TOKEN_GENERATOR_SECRET ?? 'YOUR_SECRET',
    duration: '6M',
  },

  nanoServer: {
    host: process.env.HOST ?? '0.0.0.0',
    port: process.env.PORT != null ? +process.env.PORT : 8000,
    // allowAllOrigin: true,
  },

  secureStorage: {
    userList: 'securage/vault/user-list',
    userDir,
    userOrderList: `${userDir}/order-list`,
    userProfile: `${userDir}/profile`,
  },

  publicStorage: {
    productList: 'publistore/hub/product-list/${name}',
    priceList: 'publistore/vault/price-list/${name}',
    userDir: 'publistore/auth/${userToken}',
  },
} as const;

logger.logProperty?.('config', config);
