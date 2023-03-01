import {message} from '@alwatr/i18n';
import {commandHandler} from '@alwatr/signal';
import {orderShippingSchema, type OrderShippingInfo} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {validator} from '@alwatr/validator';

import {submitOrderShippingCommandTrigger} from '../manager/context.js';
import {logger} from '../manager/logger.js';


commandHandler.define<OrderShippingInfo, OrderShippingInfo | null>(submitOrderShippingCommandTrigger.id, (orderDelivery) => {
  logger.logMethodArgs('submit-order-shipping', orderDelivery);
  delete orderDelivery._callbackSignalId; // FIXME: !

  let validOrderDelivery: OrderShippingInfo;
  try {
    validOrderDelivery = validator<OrderShippingInfo>(orderShippingSchema, orderDelivery);
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
