import {serverContextConsumer} from '@alwatr/context';

import {config} from '../../config.js';

import type {AlwatrDocumentStorage, User, ChatMessage} from '@alwatr/type';

export const chatStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<ChatMessage>>(
    'chat_storage_context',
    {
      ...config.fetchContextOptions,
      url: config.api + '/chat/',
    },
);

chatStorageContextConsumer.fsm.defineSignals([
  {
    signalId: 'user_context',
    callback: (user: User): void => {
      (chatStorageContextConsumer.getOptions().queryParameters ??= {}).userId = user.id;
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: 'get_chat_storage',
    callback: (storage: string): void => {
      chatStorageContextConsumer.request({
        queryParameters: {
          storage,
        },
      });
    },
  },
]);
