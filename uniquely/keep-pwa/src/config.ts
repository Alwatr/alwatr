import {FetchOptions} from '@alwatr/fetch';
import {getLocalStorageItem} from '@alwatr/util';

/**
 * Debug API.
 *
 * ```ts
 * localStorage.setItem('DEBUG_API', '"https://canary.keeperco.ir"');
 * ```
 */
const apiPrefix = getLocalStorageItem('DEBUG_API', '');
export const config = {
  cdn: apiPrefix + '/cdn',
  api: apiPrefix + '/api/v0',
  fetchContextOptions: <Partial<FetchOptions>>{
    method: 'GET',
    removeDuplicate: 'auto',
    retry: 2,
    retryDelay: 2_000,
  },
} as const;
