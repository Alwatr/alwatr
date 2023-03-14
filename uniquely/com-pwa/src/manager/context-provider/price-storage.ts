import {serviceRequest, type FetchOptions} from '@alwatr/fetch';
import {DispatchOptions, requestableContextProvider} from '@alwatr/signal';
import {ProductPrice} from '@alwatr/type/src/customer-order-management.js';

import {config} from '../../config.js';
import {logger} from '../logger.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';

const productPriceStorageContextProvider = requestableContextProvider.bind<
  AlwatrDocumentStorage<ProductPrice>,
  {productPriceStorageName: string}
>('product-price-context');

const finalProductPriceStorageContextProvider = requestableContextProvider.bind<
  AlwatrDocumentStorage<ProductPrice>,
  {productPriceStorageName: string}
>('final-product-price-context');

productPriceStorageContextProvider.setProvider(async (args) => {
  logger.logMethod('requestProductPriceStorageContext');
  let context = productPriceStorageContextProvider.getValue();

  if (context.state === 'pending' || context.state === 'reloading') return;

  const dispatchOptions: Partial<DispatchOptions> = {debounce: 'NextCycle'};
  const fetchOption: FetchOptions = {
    ...config.fetchContextOptions,
    url: config.api + '/price-list/',
    queryParameters: {
      name: config.priceListName.replace('${productStorage}', args.productPriceStorageName),
    },
  };

  if (context.state === 'initial') {
    context = {state: 'pending'};
    productPriceStorageContextProvider.setValue(context, dispatchOptions);
    try {
      fetchOption.cacheStrategy = 'cache_only';
      const response = (await serviceRequest(fetchOption)) as AlwatrDocumentStorage<ProductPrice>;
      context = {
        state: 'reloading',
        content: response,
      };
      productPriceStorageContextProvider.setValue(context, dispatchOptions);
    }
    catch (err) {
      if ((err as Error).message === 'fetch_cache_not_found') {
        logger.logOther('requestProductPriceStorageContext:', 'fetch_cache_not_found');
      }
      else {
        logger.error('requestProductPriceStorageContext', 'fetch_failed', err);
        context = {state: 'error'};
        productPriceStorageContextProvider.setValue(context, dispatchOptions);
        return;
      }
    }
  }

  if (navigator.onLine === false) {
    context = {
      state: 'error',
      content: context.content, // maybe offline exist
    };
    productPriceStorageContextProvider.setValue(context, dispatchOptions);
    return;
  }

  try {
    fetchOption.cacheStrategy = 'update_cache';
    const response = (await serviceRequest(fetchOption)) as AlwatrDocumentStorage<ProductPrice>;
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
    productPriceStorageContextProvider.setValue(context, dispatchOptions);
  }
  catch (err) {
    logger.error('fetchContext', 'fetch_failed', err);
    context = {
      state: 'error',
      content: context.content, // maybe offline exist
    };
    productPriceStorageContextProvider.setValue(context, dispatchOptions);
    return;
  }
});

finalProductPriceStorageContextProvider.setProvider(async (args) => {
  logger.logMethod('requestFinalProductPriceStorageContext');
  let context = finalProductPriceStorageContextProvider.getValue();

  if (context.state === 'pending' || context.state === 'reloading') return;

  const dispatchOptions: Partial<DispatchOptions> = {debounce: 'NextCycle'};
  const fetchOption: FetchOptions = {
    ...config.fetchContextOptions,
    url: config.api + '/price-list/',
    queryParameters: {
      name: config.finalPriceListName.replace('${productStorage}', args.productPriceStorageName),
    },
  };

  if (context.state === 'initial') {
    context = {state: 'pending'};
    finalProductPriceStorageContextProvider.setValue(context, dispatchOptions);
    try {
      fetchOption.cacheStrategy = 'cache_only';
      const response = (await serviceRequest(fetchOption)) as AlwatrDocumentStorage<ProductPrice>;
      context = {
        state: 'reloading',
        content: response,
      };
      finalProductPriceStorageContextProvider.setValue(context, dispatchOptions);
    }
    catch (err) {
      if ((err as Error).message === 'fetch_cache_not_found') {
        logger.logOther('requestFinalProductPriceStorageContext:', 'fetch_cache_not_found');
      }
      else {
        logger.error('requestFinalProductPriceStorageContext', 'fetch_failed', err);
        context = {state: 'error'};
        finalProductPriceStorageContextProvider.setValue(context, dispatchOptions);
        return;
      }
    }
  }

  if (navigator.onLine === false) {
    context = {
      state: 'error',
      content: context.content, // maybe offline exist
    };
    finalProductPriceStorageContextProvider.setValue(context, dispatchOptions);
    return;
  }

  try {
    fetchOption.cacheStrategy = 'update_cache';
    const response = (await serviceRequest(fetchOption)) as AlwatrDocumentStorage<ProductPrice>;
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
    finalProductPriceStorageContextProvider.setValue(context, dispatchOptions);
  }
  catch (err) {
    logger.error('fetchContext', 'fetch_failed', err);
    context = {
      state: 'error',
      content: context.content, // maybe offline exist
    };
    finalProductPriceStorageContextProvider.setValue(context, dispatchOptions);
    return;
  }
});
