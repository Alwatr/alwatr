import {FetchOptions} from '@alwatr/fetch';
import {getLocalStorageItem} from '@alwatr/util';

/**
 * Debug API.
 *
 * ```ts
 * localStorage.setItem('DEBUG_API', '"https://canary.order.soffit.co"');
 * ```
 */
const apiPrefix = getLocalStorageItem('DEBUG_API', '');
export const config = {
  api: apiPrefix + '/api/v0',
  cdn: apiPrefix + '/cdn',
  priceListName: '${productStorage}-market-ir',
  finalPriceListName: '${productStorage}-agency-ir',
  fetchContextOptions: <Partial<FetchOptions>>{
    method: 'GET',
    removeDuplicate: 'auto',
    retry: 2,
    retryDelay: 2_000,
  },
} as const;
