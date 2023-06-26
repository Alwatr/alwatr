import {FetchOptions} from '@alwatr/fetch';
import {getConfKey} from '@alwatr/pwa-helper/config.js';
import {getLocalStorageItem} from '@alwatr/util';

/**
 * Debug API.
 *
 * ```ts
 * localStorage.setItem('DEBUG_API', '"https://canary.tour.ir/"');
 * localStorage.setItem('DEBUG_CONFIG', JSON.stringify({token: 'secret_token'}));
 * ```
 */
const srvBaseUrl = getLocalStorageItem('DEBUG_API', '/');
const apiBaseUrl = srvBaseUrl + 'api/v0/';

export const config = {
  serverContext: {
    base: srvBaseUrl,
    api: apiBaseUrl,
    cdn: srvBaseUrl + 'cdn',
    token: getConfKey<string>('token'),
  },

  fetchContextOptions: <Partial<FetchOptions>>{
    removeDuplicate: 'auto',
    retry: 2,
    retryDelay: 2_000,
  },
} as const;
