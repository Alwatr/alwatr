import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {showToastSignal} from './toast.js';

import type {Job} from '../type.js';
import type {AlwatrServiceResponse} from '@alwatr/fetch';

export const jobListSignal = new SignalInterface('job-list');

async function _dispatchJobList(response: Response): Promise<void> {
  if (response.ok !== true) {
    throw new Error('fetch_failed');
  }

  const responseData = (await response.json()) as AlwatrServiceResponse<Record<string, Job>>;

  if (responseData.ok !== true) {
    throw new Error('fetch_failed');
  }

  jobListSignal.dispatch(Object.values(responseData.data));
}

jobListSignal.setProvider(async () => {
  try {
    const response = await fetch({
      url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
      token: window.appConfig?.token,
      cache: 'no-cache',
    });

    await _dispatchJobList(response);
  }
  catch (error) {
    showToastSignal.dispatch({
      message: 'عملیات با خطا رو به رو شد',
    });
  }
  return;
});

jobListSignal.request(null);
setInterval(()=>jobListSignal.request(null), 60_000);
