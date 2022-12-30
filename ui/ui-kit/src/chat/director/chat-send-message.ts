import {serviceRequest} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';

import {chatDocumentStorageSignal} from './chat-document-storage.js';

import type {CacheStrategy} from '@alwatr/fetch/type.js';
import type {AlwatrDocumentStorage, ChatTextMessage} from '@alwatr/type';

export const logger = createLogger('[director/chat-send-text-message]');
export const chatSendMessageSignal = new SignalInterface('chat-send-text-message');

async function requestSendMessage(message: string, cacheStrategy: CacheStrategy): Promise<void> {
  logger.logMethod('requestSendMessage');

  try {
    chatSendMessageSignal.dispatch(
      <AlwatrDocumentStorage<ChatTextMessage>> await serviceRequest({
        url: window.appConfig?.chat ? window.appConfig.chat + '/' : '/',
        method: 'PATCH',
        queryParameters: {
          storage: 'product/test',
        },
        token: window.appConfig?.chatToken,
        cache: 'no-cache',
        cacheStrategy,
        bodyJson: {
          id: 'auto_increment',
          from: 'user-1',
          type: 'text',
          text: message,
        },
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

chatSendMessageSignal.setProvider((message) => requestSendMessage(message.text, 'network_only'));

chatSendMessageSignal.addListener(() => {
  chatDocumentStorageSignal.request({});
});
