import {serviceRequest} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';

import type {CacheStrategy} from '@alwatr/fetch/type.js';
import type {ChatStorage} from '@alwatr/type';


export const logger = createLogger('[director/chat-storage]');
export const chatDocumentStorageSignal = new SignalInterface('chat-storage');

async function requestChatStorage(cacheStrategy: CacheStrategy): Promise<void> {
  logger.logMethod('requestChatStorage');

  try {
    chatDocumentStorageSignal.dispatch(
      <ChatStorage> await serviceRequest({
        url: window.appConfig?.chat ? window.appConfig.chat + '/storage' : '/storage',
        queryParameters: {
          name: 'product/test',
        },
        token: window.appConfig?.chatToken,
        cache: 'no-cache',
        cacheStrategy,
      }),
    );
  }
  catch (error) {
    if ((error as Error).message !== 'fetch_cache_not_found') {
      logger.error('jobListProvider', 'fetch_failed', error);
      // toast
    }
  }
}

chatDocumentStorageSignal.setProvider(() => requestChatStorage('network_first'));

requestChatStorage('cache_only').then(() => requestChatStorage('network_first'));
