import {FetchOptions} from '@alwatr/fetch';
import {getConfKey} from '@alwatr/pwa-helper/config.js';
import {getLocalStorageItem} from '@alwatr/util';

const token = getConfKey<string>('token');

/**
 * Debug API.
 *
 * ```ts
 * localStorage.setItem('DEBUG_API', '"https://canary.keeperco.ir"');
 * localStorage.setItem('DEBUG_CONFIG', JSON.stringify({token: 'secret_token'}));
 * ```
 */
const apiPrefix = getLocalStorageItem('DEBUG_API', '');
export const config = {
  cdn: apiPrefix + '/cdn',
  api: apiPrefix + '/api/v0',
  token,
  fetchContextOptions: <Partial<FetchOptions>>{
    method: 'GET',
    removeDuplicate: 'auto',
    retry: 2,
    retryDelay: 2_000,
  },
} as const;
