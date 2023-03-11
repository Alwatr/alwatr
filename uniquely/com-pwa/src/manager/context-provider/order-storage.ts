import {serviceRequest, type FetchOptions} from '@alwatr/fetch';
import {contextConsumer, DispatchOptions, requestableContextProvider} from '@alwatr/signal';

import {config} from '../../config.js';
import {logger} from '../logger.js';

import type {AlwatrDocumentStorage, User} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

const orderStorageContextProvider = requestableContextProvider.bind<AlwatrDocumentStorage<Order>>(
    'order-storage-context',
);

const userContextConsumer = contextConsumer.bind<User>('user-context');

orderStorageContextProvider.setProvider(async () => {
  logger.logMethod('requestOrderStorageContext');
  let context = orderStorageContextProvider.getValue();

  if (context.state === 'pending' || context.state === 'reloading') return;

  const userContext = userContextConsumer.getValue() ?? (await userContextConsumer.untilChange());
  const dispatchOptions: Partial<DispatchOptions> = {debounce: 'NextCycle'};
  const fetchOption: FetchOptions = {
    ...config.fetchContextOptions,
    url: config.api + '/order-list/',
    queryParameters: {
      userId: userContext.id,
    },
  };

  if (context.state === 'initial') {
    context = {state: 'pending'};
    orderStorageContextProvider.setValue(context, dispatchOptions);
    try {
      fetchOption.cacheStrategy = 'cache_only';
      const response = await serviceRequest(fetchOption) as AlwatrDocumentStorage<Order>;
      context = {
        state: 'reloading',
        content: response,
      };
      orderStorageContextProvider.setValue(context, dispatchOptions);
    }
    catch (err) {
      if ((err as Error).message === 'fetch_cache_not_found') {
        logger.logOther('requestOrderStorageContext:', 'fetch_cache_not_found');
      }
      else {
        logger.error('requestOrderStorageContext', 'fetch_failed', err);
        context = {state: 'error'};
        orderStorageContextProvider.setValue(context, dispatchOptions);
        return;
      }
    }
  }

  if (navigator.onLine === false) {
    context = {
      state: 'error',
      content: context.content, // maybe offline exist
    };
    orderStorageContextProvider.setValue(context, dispatchOptions);
    return;
  }

  try {
    fetchOption.cacheStrategy = 'update_cache';
    const response = await serviceRequest(fetchOption) as AlwatrDocumentStorage<Order>;
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
    orderStorageContextProvider.setValue(context, dispatchOptions);
  }
  catch (err) {
    logger.error('fetchContext', 'fetch_failed', err);
    context = {
      state: 'error',
      content: context.content, // maybe offline exist
    };
    orderStorageContextProvider.setValue(context, dispatchOptions);
    return;
  }
});
