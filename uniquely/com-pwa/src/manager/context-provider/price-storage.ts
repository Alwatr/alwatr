import {serverContextConsumer} from '@alwatr/context';

import {userProfileContextConsumer} from './user.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ProductPrice} from '@alwatr/type/customer-order-management.js';


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
    signalId: 'reload_product_price_storage',
    transition: 'REQUEST',
  },
]);

userProfileContextConsumer.subscribe((user) => {
  productPriceStorageContextConsumer.setOptions({
    token: user.token!,
  });

  productFinalPriceStorageContextConsumer.setOptions({
    token: user.token!,
  });
});
