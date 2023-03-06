import {getConfKey} from '@alwatr/pwa-helper/config.js';

const token = getConfKey<string>('token');
export const config = {
  api: getConfKey<string>('api'),
  cdn: getConfKey<string>('cdn'),
  token,
  productStorageList: getConfKey<Array<string>>('productStorageList'),
  priceListName: '${productStorage}-market-ir',
  finalPriceListName: '${productStorage}-agency-ir',
  fetchContextOptions: {
    method: 'GET',
    token,
    removeDuplicate: 'auto',
    retry: 10,
    retryDelay: 3_000,
  },
} as const;
