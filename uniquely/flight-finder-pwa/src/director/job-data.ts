import {createLogger} from '@alwatr/logger';
import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {showToastSignal} from './toast.js';

import type {Job, jobMeta} from '../type.js';
import type {AlwatrServiceResponse} from '@alwatr/fetch';

export const logger = createLogger('[director/job-data]');
export const jobDataSignal = new SignalInterface('job-data');

async function _dispatchJobList(response: Response): Promise<void> {
  logger.logMethodArgs('_dispatchJobList', {response});

  if (response.ok !== true) {
    throw new Error('fetch_failed');
  }

  const responseData = (await response.json()) as AlwatrServiceResponse<Record<string, Job>, jobMeta>;

  if (responseData.ok !== true) {
    throw new Error('fetch_failed');
  }

  jobDataSignal.dispatch(responseData);
}

jobDataSignal.setProvider(async () => {
  try {
    logger.logMethod('jobListProvider');

    const response = await fetch({
      url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
      token: window.appConfig?.token,
      cacheStrategy: 'stale_while_revalidate',
      revalidateCallback(response) {
        logger.logMethodArgs('revalidateCallback', {response});

        _dispatchJobList(response.clone());
      },
      cache: 'no-cache',
    });

    await _dispatchJobList(response);
  } catch (error) {
    logger.error('jobListProvider', 'fetch_failed', error);

    showToastSignal.dispatch({
      message: 'عملیات با خطا رو به رو شد',
    });
  }
  return;
});

jobDataSignal.request(null);
setInterval(() => jobDataSignal.request(null), 60_000);
