import {serverContextConsumer} from '@alwatr/context';

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
      url: config.api + '/storage/price-list-' + config.priceListName.replace('${productStorage}', 'tile'),
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
      url: config.api + '/storage/price-list-' + config.priceListName.replace('${productStorage}', 'tile') + '.json',
    },
);

productFinalPriceStorageContextConsumer.fsm.defineSignals([
  {
    signalId: 'reload_product_price_storage',
    transition: 'REQUEST',
  },
]);
