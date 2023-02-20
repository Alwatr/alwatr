import {message} from '@alwatr/i18n';
import {commandHandler} from '@alwatr/signal';
import {orderDeliverySchema, type OrderDelivery} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {validator} from '@alwatr/validator';

import {logger} from './logger.js';
import {submitOrderShippingCommandTrigger} from '../context.js';


commandHandler.define<OrderDelivery, OrderDelivery | null>(submitOrderShippingCommandTrigger.id, (orderDelivery) => {
  logger.logMethodArgs('submit-order-shipping', orderDelivery);
  delete orderDelivery._callbackSignalId; // FIXME: !
  console.log(orderDelivery);

  let validOrderDelivery: OrderDelivery;
  try {
    validOrderDelivery = validator<OrderDelivery>(orderDeliverySchema, orderDelivery);
  }
  catch (err) {
    logger.error('submit-order-shipping', 'invalid_form_data', {err});
    snackbarSignalTrigger.request({
      message: message('order_shipping_invalid'),
    });
    return null;
  }

  snackbarSignalTrigger.request({
    message: message('order_shipping_submit_success'),
  });

  return validOrderDelivery;
});
