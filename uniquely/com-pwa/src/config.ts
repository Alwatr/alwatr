import {FetchOptions} from '@alwatr/fetch';
import {getConfKey} from '@alwatr/pwa-helper/config.js';

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
} as const;
