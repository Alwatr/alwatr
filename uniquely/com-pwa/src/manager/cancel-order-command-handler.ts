import {serviceRequest} from '@alwatr/fetch';
import {commandHandler} from '@alwatr/signal';

import {orderStorageContextConsumer} from './context-provider/order-storage.js';
import {userProfileContextConsumer} from './context-provider/user.js';
import {cancelOrderCommandTrigger} from './context.js';
import {logger} from './logger.js';
import {config} from '../config.js';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';

commandHandler.define<{orderId: string}, string | null>(cancelOrderCommandTrigger.id, async (param) => {
  const userContext = userProfileContextConsumer.getValue() ?? await userProfileContextConsumer.untilChange();

  try {
    const response = await serviceRequest<AlwatrServiceResponseSuccessWithMeta<never>>({
      ...config.fetchContextOptions,
      method: 'PUT',
      url: config.serverContext.cancelOrder,
      userAuth: {
        id: userContext.id,
        token: userContext.token!,
      },
      queryParameters: {
        orderId: param.orderId,
      },
      retry: 3,
    });

    if (response.ok !== true) {
      logger.error('cancelOrderCommand', 'cancel_order_failed', response, param);
      return null;
    }

    orderStorageContextConsumer.request();
    return param.orderId;
  }
  catch (err) {
    logger.error('cancelOrderCommand', 'cancel_order_failed', err, param);
    return null;
  }
});
