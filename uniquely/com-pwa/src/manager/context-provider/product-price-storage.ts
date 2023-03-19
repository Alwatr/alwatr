import {serviceRequest, type FetchOptions} from '@alwatr/fetch';
import {requestableContextProvider, type DispatchOptions} from '@alwatr/signal';

import {config} from '../../config.js';
import {logger} from '../logger.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Product} from '@alwatr/type/customer-order-management.js';

const productStorageContextProvider = requestableContextProvider.bind<
  AlwatrDocumentStorage<Product>,
  {productStorageName: string}
>('product-storage-context');

productStorageContextProvider.setProvider(async (args) => {
  logger.logMethod('requestProductStorageContext');
  let context = productStorageContextProvider.getValue();

  if (context.state === 'pending' || context.state === 'reloading') return;

  const dispatchOptions: Partial<DispatchOptions> = {debounce: 'NextCycle'};
  const fetchOption: FetchOptions = {
    ...config.fetchContextOptions,
    url: config.api + '/product-list/',
    queryParameters: {
      storage: args.productStorageName,
    },
  };

  if (context.state === 'initial') {
    context = {state: 'pending'};
    productStorageContextProvider.setValue(context, dispatchOptions);
    try {
      fetchOption.cacheStrategy = 'cache_only';
      const response = (await serviceRequest(fetchOption)) as AlwatrDocumentStorage<Product>;
      context = {
        state: 'reloading',
        content: response,
      };
      productStorageContextProvider.setValue(context, dispatchOptions);
    }
    catch (err) {
      if ((err as Error).message === 'fetch_cache_not_found') {
        logger.logOther('requestProductStorageContext:', 'fetch_cache_not_found');
      }
      else {
        logger.error('requestProductStorageContext', 'fetch_failed', err);
        context = {state: 'error'};
        productStorageContextProvider.setValue(context, dispatchOptions);
        return;
      }
    }
  }

  if (navigator.onLine === false) {
    context = {
      state: 'error',
      content: context.content, // maybe offline exist
    };
    productStorageContextProvider.setValue(context, dispatchOptions);
    return;
  }

  try {
    fetchOption.cacheStrategy = 'update_cache';
    const response = (await serviceRequest(fetchOption)) as AlwatrDocumentStorage<Product>;
    if (
      context.content != null &&
      response.meta?.lastUpdated != undefined &&
      response.meta.lastUpdated === context.content.meta?.lastUpdated
    ) {
      // no changed
      context = {
        state: 'complete',
        content: context.content,
      };
    }
    else {
      context = {
        state: 'complete',
        content: response,
      };
    }
    productStorageContextProvider.setValue(context, dispatchOptions);
  }
  catch (err) {
    logger.error('fetchContext', 'fetch_failed', err);
    context = {
      state: 'error',
      content: context.content, // maybe offline exist
    };
    productStorageContextProvider.setValue(context, dispatchOptions);
    return;
  }
});
