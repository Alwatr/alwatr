import {serverContextConsumer} from '@alwatr/context';

import {userProfileContextConsumer} from './user.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ComUser, ProductPrice} from '@alwatr/type/customer-order-management.js';


/**
 * Product Price.
 */
export const productPriceStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<ProductPrice>>(
    'product_price_storage_context',
    {
      ...config.fetchContextOptions,
      url: config.serverContext.marketPriceList.replace('${productStorageName}', 'tile'),
    },
);

productPriceStorageContextConsumer.fsm.defineSignals([
  {
    signalId: userProfileContextConsumer.id,
    callback: (user: ComUser): void => {
      productPriceStorageContextConsumer.setOptions({
        token: user.token!,
      });
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: 'reload_product_price_storage',
    transition: 'REQUEST',
  },
]);

/**
 * Product Final Price.
 */
export const productFinalPriceStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<ProductPrice>>(
    'product_final_price_storage_context',
    {
      ...config.fetchContextOptions,
      url: config.serverContext.agencyPriceList.replace('${productStorageName}', 'tile')
          .replace('${priceListName}', 'agency'), // FIXME: use `priceNameList` in `user`s profile
    },
);

productFinalPriceStorageContextConsumer.fsm.defineSignals([
  {
    signalId: userProfileContextConsumer.id,
    callback: (user: ComUser): void => {
      productFinalPriceStorageContextConsumer.setOptions({
        token: user.token!,
      });
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: 'reload_product_price_storage',
    transition: 'REQUEST',
  },
]);
