import {serviceRequest} from '@alwatr/fetch';
import {redirect} from '@alwatr/router';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';

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

  snackbarSignalTrigger.request({
    message: 'اع زدی که! یک سفارش جدید الکی ثبت شد!',
  });

  redirect('/orders');

  return response.data;
});
