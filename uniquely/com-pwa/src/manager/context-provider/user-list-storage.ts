import {serverContextConsumer} from '@alwatr/context';

import {userProfileContextConsumer} from './user.js';
import {config} from '../../config.js';

import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';
import type {ComUserIncOrder} from '@alwatr/type/customer-order-management.js';

export const userListIncOrderStorageContextConsumer =
  serverContextConsumer<AlwatrServiceResponseSuccessWithMeta<Record<string, ComUserIncOrder>>>(
      'admin_order_list_storage_context',
      {
        ...config.fetchContextOptions,
        url: config.serverContext.adminUserListIncOrder,
      },
  );

userProfileContextConsumer.subscribe((userProfile) => {
  userListIncOrderStorageContextConsumer.request({
    userAuth: {
      id: userProfile.id,
      token: userProfile.token!,
    },
  });
});
