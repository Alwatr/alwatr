import {FetchOptions} from '@alwatr/fetch';
import {getConfKey} from '@alwatr/pwa-helper/config.js';

import type {AuthorizedRouteIdRecordType} from './type.js';

const token = getConfKey<string>('token');
export const config = {
  api: getConfKey<string>('api'),
  cdn: getConfKey<string>('cdn'),
  token,
  productStorageList: getConfKey<Array<string>>('productStorageList'),
  priceListName: '${productStorage}-market-ir',
  finalPriceListName: '${productStorage}-agency-ir',
  fetchContextOptions: <Partial<FetchOptions>> {
    method: 'GET',
    token,
    removeDuplicate: 'auto',
    retry: 2,
    retryDelay: 2_000,
  },
  authorizedRouteIdRecord: <AuthorizedRouteIdRecordType>{
    'admin': ['user-list'], // e.g. `order-list`, `price-list` and etc...
  },
} as const;
