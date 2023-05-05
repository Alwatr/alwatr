import {FetchOptions} from '@alwatr/fetch';
import {getConfKey} from '@alwatr/pwa-helper/config.js';

export const config = {
  cdn: getConfKey<string>('cdn'),
  fetchContextOptions: <Partial<FetchOptions>> {
    method: 'GET',
    removeDuplicate: 'auto',
    retry: 2,
    retryDelay: 2_000,
  },
} as const;
