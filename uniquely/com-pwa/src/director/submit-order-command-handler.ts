import {serviceRequest} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';
import {JsonSchema, validator} from '@alwatr/validator';

import {config} from '../config.js';
import {userContextConsumer, orderStorageContextProvider, submitOrderCommandTrigger} from '../context.js';


import type {Order, OrderDelivery} from '@alwatr/type/customer-order-management.js';

const validSchema: JsonSchema = {
  recipientName: String,
  recipientNationalCode: Number,
  address: String,
  carType: String,
  shipmentType: String,
  timePeriod: String,
};

commandHandler.define<Partial<Order>, Order | null>(submitOrderCommandTrigger.id, async (order) => {
  const userContext = userContextConsumer.getValue() ?? await userContextConsumer.untilChange();

  // TODO: get product list

  // 1. validate
  let validOrder;
  try {
    validOrder = validator(validSchema, order.delivery as OrderDelivery) as Partial<Order>;
  }
  catch {
    snackbarSignalTrigger.request({
      message: message('order_form_invalid_detail'),
      duration: 5,
    });

    return null;
  }

  // 2. send to server
  let response;
  try {
    response = await serviceRequest<Order>({
      method: 'PUT',
      url: config.api + '/order/',
      queryParameters: {
        userId: userContext.id,
      },
      token: config.token,
      bodyJson: {
        delivery: validOrder.delivery,
      },
    });
  }
  catch {
    await snackbarSignalTrigger.requestWithResponse({
      message: message('order_form_submit_failed'),
      actionLabel: message('retry'),
      duration: -1,
    });

    return await submitOrderCommandTrigger.requestWithResponse(order);
  }

  // TODO: handle response.ok === false!

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
