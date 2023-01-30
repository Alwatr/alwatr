import {type CacheStrategy, serviceRequest} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';
import {commandTrigger, requestableContextConsumer, requestableContextProvider} from '@alwatr/signal';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Job} from '@alwatr/type/flight-finder.js';

export const logger = createLogger('[director/job-document-storage]');

async function requestJobStorage(cacheStrategy: CacheStrategy): Promise<AlwatrDocumentStorage<Job> | void> {
  logger.logMethod('jobListProvider');

  try {
    return (<AlwatrDocumentStorage<Job>> await serviceRequest({
      url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
      token: window.appConfig?.token,
      cache: 'no-cache',
      cacheStrategy,
    }));
  }
  catch (error) {
    if ((error as Error).message !== 'fetch_cache_not_found') {
      logger.error('jobListProvider', 'fetch_failed', error);
      commandTrigger.request('toast', {
        message: 'عملیات با خطا رو به رو شد',
      });
      return;
    }
  }
}

requestableContextProvider.setProvider<AlwatrDocumentStorage<Job>, null>('job-document-storage', () => {
  return requestJobStorage('network_first');
});

requestJobStorage('cache_only').then(() => requestJobStorage('network_first'));

setInterval(() => requestableContextConsumer.request('job-document-storage', null), 60_000);
