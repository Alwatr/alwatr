import {serviceRequest} from '@alwatr/fetch';
import {commandHandler, contextProvider} from '@alwatr/signal';

import {userContextConsumer, submitOrderCommandTrigger, orderStorageContextConsumer} from './context.js';
import {logger} from './logger.js';
import {config} from '../config.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

commandHandler.define<Order, Order | null>(submitOrderCommandTrigger.id, async (order) => {
  const userContext = userContextConsumer.getValue() ?? await userContextConsumer.untilChange();

  try {
    const response = await serviceRequest<Order>({
      ...config.fetchContextOptions,
      method: 'PUT',
      url: config.api + '/order/',
      queryParameters: {
        userId: userContext.id,
      },
      bodyJson: order,
      retry: 3,
    });

    const newOrder = response.data;

    const orderStorage = orderStorageContextConsumer.getValue();
    if (orderStorage != null) {
      orderStorage.data[newOrder.id] = newOrder;
      orderStorage.meta.lastUpdated = Date.now();
      contextProvider.setValue(orderStorageContextConsumer.id, orderStorage);
    }

    return newOrder;
  }
  catch (err) {
    logger.error('submitOrderCommand', 'submit_failed', err, order);
    return null;
  }
});
