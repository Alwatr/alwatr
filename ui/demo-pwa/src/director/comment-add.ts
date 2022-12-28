import {CacheStrategy, serviceRequest} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {ChatMessage} from '../type.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';

export const commentDocumentStorageSignal = new SignalInterface('comment-document-storage');


async function addComment(cacheStrategy: CacheStrategy): Promise<void> {
  // logger.logMethod('jobListProvider');
  console.log('jobListProvider');

  try {
    commentDocumentStorageSignal.dispatch(
      <AlwatrDocumentStorage<ChatMessage>> await serviceRequest({
        url: 'http://127.0.0.1:8000/',
        method: 'PATCH',
        token: 'YOUR_SECRET_TOKEN',
        cache: 'no-cache',
        cacheStrategy,
        queryParameters: {
          storage: 'product/test',
        },
        bodyJson: {
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


commentDocumentStorageSignal.setProvider(() => addComment('network_first'));
addComment('cache_only').then(() => addComment('network_first'));

commentDocumentStorageSignal.request(null);
