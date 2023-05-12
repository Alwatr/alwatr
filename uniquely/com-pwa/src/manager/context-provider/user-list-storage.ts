import {serverContextConsumer} from '@alwatr/context';

import {userProfileContextConsumer, userTokenContextConsumer} from './user.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const userListStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<ComUser>>(
    'user_list_storage_context',
    config.fetchContextOptions,
);

userListStorageContextConsumer.fsm.defineSignals([
  {
    signalId: userTokenContextConsumer.id,
    callback: (userToken: string): void => {
      const userId = userProfileContextConsumer.getValue()?.id;
      // TODO: Handle a situation that `userId` equals `undefined`

      userListStorageContextConsumer.request({
        userAuth: {
          id: userId,
          token: userToken,
        },
      });
    },
    receivePrevious: 'NextCycle',
  },
]);
