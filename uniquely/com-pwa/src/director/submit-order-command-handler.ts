import {serviceRequest} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {logger} from '../manager/logger.js';
import {config} from '../config.js';
import {userContextConsumer, orderStorageContextProvider, submitOrderCommandTrigger} from '../context.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

commandHandler.define<Partial<Order>, Order | null>(submitOrderCommandTrigger.id, async (order) => {
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

    const orderStorage = orderStorageContextProvider.getValue();
    if (orderStorage != null) {
      orderStorage.data[newOrder.id] = newOrder;
      orderStorageContextProvider.setValue(orderStorage);
    }

    snackbarSignalTrigger.request({
      message: message('submit_order_success'),
    });

    redirect('/order/' + newOrder.id);

    return newOrder;
  }
  catch (err) {
    logger.error('submitOrderCommand', 'submit_failed', err, order);

    await snackbarSignalTrigger.requestWithResponse({
      message: message('submit_order_failed'),
    });

    return null;
  }
});
