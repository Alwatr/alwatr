import {serviceRequest} from '@alwatr/fetch';
import {AlwatrDocumentStorage} from '@alwatr/fetch/src/type.js';
import {createLogger} from '@alwatr/logger';
import {SignalInterface} from '@alwatr/signal';

import {showToastSignal} from './toast.js';

import type {Job} from '../type.js';

export const logger = createLogger('[director/job-data]');
export const jobDataSignal = new SignalInterface('job-data');

jobDataSignal.setProvider(async () => {
  logger.logMethod('jobListProvider');
  const firstTime = jobDataSignal.value == null;

  try {
    jobDataSignal.dispatch(
      <AlwatrDocumentStorage<Job>> await serviceRequest({
        url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
        token: window.appConfig?.token,
        cache: 'no-cache',
        cacheStrategy: firstTime ? 'cache_only' : 'network_only',
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

  if (firstTime) jobDataSignal.request(null);
});

jobDataSignal.request(null);
setInterval(() => jobDataSignal.request(null), 60_000);
