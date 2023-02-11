import {serviceRequest} from '@alwatr/fetch';
import {contextConsumer, requestableContextConsumer, requestableContextProvider} from '@alwatr/signal';
import {delay, getClientId} from '@alwatr/util';

import {config} from '../config.js';

import type {User} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

requestableContextProvider.setProvider<Order, Order>('set-order', async (detail) => {
  const userId = contextConsumer.getValue<User>('user-context');
  if (userId == null) throw new Error('user_id_required');

  detail.clientId = getClientId(),
  detail.id = `${userId}-1`;

  await serviceRequest<Order>({
    method: 'PUT',
    url: config.api + '/order/',
    queryParameters: {
      userId: userId.id,
    },
    token: config.token,
    bodyJson: detail,
  });
});

await delay(2000).then(() => {
  requestableContextConsumer.request<Partial<Order>>('set-order', {
    itemList: [
      {
        productId: '3232233323',
        price: {
          price: 1000000,
          finalPrice: 950000,
        },
        qty: 20,
      },
    ],

    delivery: {
      recipientName: 'ali',
      recipientNationalCode: '0934614566',
      address: 'Mashhad, 29 dey, koche 29',
      shipmentType: 'x',
      carType: 'y',
      timePeriod: '1-2w',
    },

    discountType: 'number',
    totalPrice: 1000000,
    shippingPrice: 1100000,
    finalPrice: 900000,
    discount: 0,
    status: 'draft',
  });
});
