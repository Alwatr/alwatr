import {getConfKey} from '@alwatr/pwa-helper/config.js';

export const config = {
  api: getConfKey<string>('api'),
  cdn: getConfKey<string>('cdn'),
  token: getConfKey<string>('token'),
  productStorageList: getConfKey<Array<string>>('productStorageList'),
};
