import {serverContextConsumer} from '@alwatr/context';

import {userProfileContextConsumer} from './user.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const userListStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<ComUser>>(
    'user_list_storage_context',
    {
      ...config.fetchContextOptions,
      url: config.serverContext.userList,
    },
);

userProfileContextConsumer.subscribe((userProfile) => {
  userListStorageContextConsumer.request({
    userAuth: {
      id: userProfile.id,
      token: userProfile.token!,
    },
  });
});
