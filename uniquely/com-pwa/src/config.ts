import {FetchOptions} from '@alwatr/fetch';
import {getLocalStorageItem} from '@alwatr/util';

/**
 * Debug API.
 *
 * ```ts
 * localStorage.setItem('DEBUG_API', '"https://canary.order.soffit.co/"');
 * ```
 */
const srvBaseUrl = getLocalStorageItem('DEBUG_API', '/');
const apiBaseUrl = srvBaseUrl + 'api/v1/';

export const config = {
  serverContext: {
    base: srvBaseUrl,
    cdn: srvBaseUrl + 'cdn',
    api: apiBaseUrl,

    // public access
    productList: apiBaseUrl + 'publistore/product-list/${productStorageName}',
    marketPriceList: apiBaseUrl + 'publistore/price-list/${productStorageName}-market-ir',
    agencyPriceList: apiBaseUrl + 'publistore/price-list/${productStorageName}-agency-ir',

    // user access
    userProfile: apiBaseUrl + 'publistore/auth/profile',
    userOrderList: apiBaseUrl + 'publistore/auth/order-list',
    newOrder: apiBaseUrl + 'order',

    // admin access
    userList: apiBaseUrl + 'user-list',
  },

  fetchContextOptions: <Partial<FetchOptions>>{
    removeDuplicate: 'auto',
    retry: 2,
    retryDelay: 2_000,
  },
} as const;
