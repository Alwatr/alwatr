import {serviceRequest} from '@alwatr/fetch';
import {commandHandler} from '@alwatr/signal';


import {orderStorageContextConsumer} from './context-provider/order-storage.js';
import {userProfileContextConsumer} from './context-provider/user.js';
import {submitOrderCommandTrigger} from './context.js';
import {logger} from './logger.js';
import {config} from '../config.js';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

commandHandler.define<Order, Order | null>(submitOrderCommandTrigger.id, async (order) => {
  const userContext = userProfileContextConsumer.getValue() ?? await userProfileContextConsumer.untilChange();

  try {
    const response = await serviceRequest<AlwatrServiceResponseSuccessWithMeta<Order>>({
      ...config.fetchContextOptions,
      method: 'PUT',
      url: config.serverContext.newOrder,
      queryParameters: {
        userId: userContext.id,
      },
      bodyJson: order,
      retry: 3,
    });

    const newOrder = response.data;

    orderStorageContextConsumer.request();

    // const orderStorage = orderStorageContextConsumer.getValue().content;
    // if (orderStorage != null) {
    //   orderStorage.data[newOrder.id] = newOrder;
    //   orderStorage.meta.lastUpdated = Date.now();
    //   contextProvider.setValue(orderStorageContextConsumer.id, orderStorage);
    // }

    return newOrder;
  }
  catch (err) {
    logger.error('submitOrderCommand', 'submit_failed', err, order);
    return null;
  }
});
