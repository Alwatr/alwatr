import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {loadingSignal} from './loading';
import {showToastSignal} from './toast';

import type {Job} from '../type';
import type {AlwatrServiceResponse} from '@alwatr/fetch';

export const jobListSignal = new SignalInterface('job-list');

jobListSignal.setProvider(async () => {
  loadingSignal.request({
    key: 'job-list',
    status: 'start',
  });

  try {
    const response = await fetch({
      url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
      token: window.appConfig?.token,
      cacheStrategy: 'stale_while_revalidate',
    });

    if (response.ok !== true) {
      throw new Error('fetch_failed');
    }

    const responseData = (await response.json()) as AlwatrServiceResponse<Record<string, Job>>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }

    return Object.values(responseData.data);
  }
  catch (error) {
    showToastSignal.dispatch({
      message: 'عملیات با خطا رو به رو شد',
    });
  }

  loadingSignal.request({
    key: 'job-list',
    status: 'end',
  });

  return;
});

jobListSignal.request({});
