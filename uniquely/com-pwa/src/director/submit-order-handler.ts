import {serviceRequest} from '@alwatr/fetch';
import {commandHandler} from '@alwatr/signal';

import {config} from '../config.js';
import {userContextConsumer, orderStorageContextProvider, submitOrderCommandTrigger} from '../context.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

commandHandler.define<Partial<Order>, Order>(submitOrderCommandTrigger.id, async (order) => {
  const userContext = userContextConsumer.getValue() ?? await userContextConsumer.untilChange();

  const response = await serviceRequest<Order>({
    method: 'PUT',
    url: config.api + '/order/',
    queryParameters: {
      userId: userContext.id,
    },
    token: config.token,
    bodyJson: order,
  });

  const newOrder = response.data;

  const orderStorage = orderStorageContextProvider.getValue();
  if (orderStorage != null) {
    orderStorage.data[newOrder.id] = newOrder;
    orderStorageContextProvider.setValue(orderStorage);
  }

  return response.data;
});
