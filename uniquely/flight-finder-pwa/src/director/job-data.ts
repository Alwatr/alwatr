import {serviceRequest} from '@alwatr/fetch';
import {AlwatrDocumentStorage, CacheStrategy} from '@alwatr/fetch/src/type.js';
import {createLogger} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';

import {showToastSignal} from './toast.js';

import type {Job} from '../type.js';

export const logger = createLogger('[director/job-data]');
export const jobDataSignal = new SignalInterface('job-data');

async function requestJobStorage(cacheStrategy: CacheStrategy): Promise<void> {
  logger.logMethod('jobListProvider');

  try {
    jobDataSignal.dispatch(
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

jobDataSignal.setProvider(() => requestJobStorage('network_first'));

requestJobStorage('cache_only').then(() => requestJobStorage('network_first'));

setInterval(() => jobDataSignal.request(null), 60_000);
