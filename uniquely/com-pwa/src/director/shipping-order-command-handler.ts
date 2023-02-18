import {message} from '@alwatr/i18n';
import {commandHandler} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';
import {validator} from '@alwatr/validator';

import {logger} from './logger.js';
import {currentOrderContextProvider, submitOrderShippingCommandTrigger} from '../context.js';
import {orderDeliverySchema} from '../type.js';

import type {OrderDelivery} from '@alwatr/type/src/customer-order-management.js';

commandHandler.define<OrderDelivery, OrderDelivery | null>(submitOrderShippingCommandTrigger.id, (orderDelivery) => {
  logger.logMethodArgs('submit-order-shipping', orderDelivery);
  delete orderDelivery._callbackSignalId; // FIXME: !
  console.log(orderDelivery);

  let validOrderDelivery: OrderDelivery;
  try {
    validOrderDelivery = validator(orderDeliverySchema, orderDelivery) as OrderDelivery;
  }
  catch (err) {
    snackbarSignalTrigger.request({
      message: message('order_shipping_invalid'),
    });
    logger.error('submit-order-shipping', 'invalid_form_data', {err});
    return null;
  }

  currentOrderContextProvider.setValue({
    ...currentOrderContextProvider.getValue(),
    delivery: validOrderDelivery,
  });

  snackbarSignalTrigger.request({
    message: message('order_shipping_submit_success'),
  });

  return validOrderDelivery;
});
