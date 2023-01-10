import {serviceRequest} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';

import type {CacheStrategy} from '@alwatr/fetch/type.js';
import type {ChatStorage} from '@alwatr/type';


const logger = createLogger('[director/chat-storage]');
export const chatStorageSignal = new SignalInterface('chat-storage');

async function requestChatStorage(cacheStrategy: CacheStrategy): Promise<void> {
  logger.logMethod('requestChatStorage');

  try {
    chatStorageSignal.dispatch(
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

chatStorageSignal.setProvider(() => requestChatStorage('network_first'));

requestChatStorage('cache_only').then(() => requestChatStorage('network_first'));
