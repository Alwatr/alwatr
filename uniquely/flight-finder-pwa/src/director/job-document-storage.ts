import {serviceRequest} from '@alwatr/fetch';
import {AlwatrDocumentStorage, CacheStrategy} from '@alwatr/fetch/src/type.js';
import {createLogger} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';

import {showToastSignal} from './toast.js';

import type {Job} from '../type.js';

export const logger = createLogger('[director/job-document-storage]');
export const jobDocumentStorageSignal = new SignalInterface('job-document-storage');

async function requestJobStorage(cacheStrategy: CacheStrategy): Promise<void> {
  logger.logMethod('jobListProvider');

  try {
    jobDocumentStorageSignal.dispatch(
      <AlwatrDocumentStorage<Job>> await serviceRequest({
        url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
        token: window.appConfig?.token,
        cache: 'no-cache',
        cacheStrategy,
      }),
    );
  }
  catch (error) {
    if ((error as Error).message !== 'fetch_cache_not_found') {
      logger.error('jobListProvider', 'fetch_failed', error);
      showToastSignal.dispatch({
        message: 'عملیات با خطا رو به رو شد',
      });
    }
  }
}

jobDocumentStorageSignal.setProvider(() => requestJobStorage('network_first'));

requestJobStorage('cache_only').then(() => requestJobStorage('network_first'));

setInterval(() => jobDocumentStorageSignal.request(null), 60_000);
