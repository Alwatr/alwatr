import {serverContextConsumer} from '@alwatr/context';

import {userProfileContextConsumer} from './user.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage, ChatMessage} from '@alwatr/type';

export const chatStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<ChatMessage>>(
    'chat_storage_context',
    {
      ...config.fetchContextOptions,
      url: config.serverContext.api + '/chat/',
    },
);

userProfileContextConsumer.subscribe((userProfile) => {
  chatStorageContextConsumer.setOptions({
    queryParameters: {
      userId: userProfile.id,
    },
  });
}, {receivePrevious: 'NextCycle'});
