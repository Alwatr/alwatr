import {serverContextConsumer} from '@alwatr/context';
import {requestIdleCallback} from '@alwatr/util';

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

requestIdleCallback(() => {
  productStorageContextConsumer.subscribe(() => {
    const productList = productStorageContextConsumer.getResponse();
    if (productList == null || productStorageContextConsumer.getState().target !== 'complete') return;

    for (const productId in productList.data) {
      if (Object.prototype.hasOwnProperty.call(productList.data, productId)) {
        const product = productList.data[productId];
        const img = new Image();
        img.src = config.serverContext.cdn + '/medium/' + product.image.id;
      }
    }
  });

  productStorageContextConsumer.require();
});
