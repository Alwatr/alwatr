import {CacheStrategy, serviceRequest} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {ChatMessage} from '../type.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';

export const commentDocumentStorageSignal = new SignalInterface('comment-document-storage');

async function requestCommentStorage(cacheStrategy: CacheStrategy): Promise<void> {
  // logger.logMethod('jobListProvider');
  console.log('jobListProvider');


  try {
    commentDocumentStorageSignal.dispatch(
      <AlwatrDocumentStorage<ChatMessage>> await serviceRequest({
        url: 'http://127.0.0.1:8000/storage',
        token: 'YOUR_SECRET_TOKEN',
        cache: 'no-cache',
        cacheStrategy,
        queryParameters: {
          name: 'product/test',
        },
      }),
    );
  }
  catch (error) {
    if ((error as Error).message !== 'fetch_cache_not_found') {
      // logger.error('jobListProvider', 'fetch_failed', error);
      // showToastSignal.dispatch({
      //   message: 'عملیات با خطا رو به رو شد',
      // });
    }
  }
}


commentDocumentStorageSignal.setProvider(() => requestCommentStorage('network_first'));
requestCommentStorage('cache_only').then(() => requestCommentStorage('network_first'));

commentDocumentStorageSignal.request(null);
