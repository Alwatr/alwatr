import {FetchOptions} from '@alwatr/fetch';
import {getLocalStorageItem} from '@alwatr/util';

import type {CarType} from '@alwatr/type/customer-order-management.js';

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
    productList: apiBaseUrl + 'publistore/hub/product-list/${productStorageName}',
    marketPriceList: apiBaseUrl + 'publistore/vault/price-list/${productStorageName}-market-ir',
    agencyPriceList: apiBaseUrl + 'publistore/vault/price-list/${productStorageName}-${priceListName}-ir',

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

  order: {
    factor: {
      box2m2: 3.6,
      box2tile: 10,
    },
    pallet: {
      boxSize: 80,
      price: 190_000,
    },
    lading: <Record<CarType, {fee: number; capacity: number}>> {
      'nissan': {
        capacity: 90,
        fee: 96_000,
      },
      'camion_solo': {
        capacity: 460,
        fee: 150_000,
      },
      'camion_dual': {
        capacity: 680,
        fee: 190_000,
      },
      'trailer_truck': {
        capacity: 1120,
        fee: 290_000,
      },
      'camion_911': {
        capacity: 227,
        fee: 110_000,
      },
      'camion_800': {
        capacity: 180,
        fee: 108_000,
      },
      'camion_600': {
        capacity: 136,
        fee: 101_000,
      },
      'camion_mini': {
        capacity: 113,
        fee: 100_000,
      },
    },
  },
} as const;
