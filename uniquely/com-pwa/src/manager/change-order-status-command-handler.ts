import {serviceRequest} from '@alwatr/fetch';
import {commandHandler} from '@alwatr/signal';

import {userListIncOrderStorageContextConsumer} from './context-provider/user-list-storage.js';
import {userProfileContextConsumer} from './context-provider/user.js';
import {changeOrderStatusTrigger} from './context.js';
import {logger} from './logger.js';
import {config} from '../config.js';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

commandHandler.define<{userId: string, orderId: string, status: string}, {userId: string, order: Order} | null>(
    changeOrderStatusTrigger.id, async (param) => {
      const userContext = userProfileContextConsumer.getValue() ?? await userProfileContextConsumer.untilChange();

      try {
        const response = await serviceRequest<AlwatrServiceResponseSuccessWithMeta<{userId: string, order: Order}>>({
          ...config.fetchContextOptions,
          method: 'PATCH',
          url: config.serverContext.orderStatus,
          userAuth: {
            id: userContext.id,
            token: userContext.token!,
          },
          queryParameters: {
            userId: param.userId,
            orderId: param.orderId,
            status: param.status,
          },
          retry: 3,
        });

        if (response.ok !== true) {
          logger.error('changeOrderStatus', 'change_user_status_failed', response, param);
          return null;
        }

        userListIncOrderStorageContextConsumer.request();
        return response.data as {userId: string, order: Order};
      }
      catch (err) {
        logger.error('changeOrderStatus', 'change_user_status_failed', err, param);
        return null;
      }
    },
);
