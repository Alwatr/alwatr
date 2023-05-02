import {serverContextConsumer} from '@alwatr/context';

import {userTokenContextConsumer} from './user.js';
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
      userListStorageContextConsumer.request({
        url: config.api + '/storage/user-list/',
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });
    },
    receivePrevious: 'NextCycle',
  },
]);
