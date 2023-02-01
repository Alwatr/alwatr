import {getConfKey} from '@alwatr/pwa-helper/config.js';

export const config = {
  api: getConfKey<string>('api'),
  token: getConfKey<string>('token'),
};
