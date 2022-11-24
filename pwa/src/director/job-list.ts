import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {toastShowSignal} from './toast-show';

import type {Job, ServerResponse} from '../type';

export const jobListSignal = new SignalInterface('job-list');

jobListSignal.setProvider(async () => {
  try {
    const response = await fetch({
      url: window.appConfig?.api ?? '/job',
      token: window.appConfig?.token,
      cacheStrategy: 'stale_while_revalidate',
    });

    if (response.ok !== true) {
      throw new Error('fetch_failed');
    }

    const responseData = (await response.json()) as ServerResponse<Record<string, Job>>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }

    return Object.values(responseData.data);
  }
  catch (error) {
    toastShowSignal.request({
      message: (error as Error).message,
    });
  }
  return;
});

jobListSignal.request();
