import {serverContextConsumer} from '@alwatr/context';

import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Product} from '@alwatr/type/customer-order-management.js';

export const productStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<Product>>(
    'product_storage_context',
    {
      ...config.fetchContextOptions,
      url: config.serverContext.productList.replace('${productStorageName}', 'tile'),
    },
);

productStorageContextConsumer.fsm.defineSignals([
  {
    signalId: 'reload_product_storage',
    transition: 'REQUEST',
  },
]);
