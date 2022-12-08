import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {jobListSignal} from './job-list';
import {loadingSignal} from './loading';
import {showToastSignal} from './toast';

import type {AlwatrServiceResponse} from '@alwatr/fetch';

export const jobDeleteSignal = new SignalInterface('job-delete');

jobDeleteSignal.addListener(async (id) => {
  loadingSignal.request({
    key: 'job-delete',
    status: 'start',
  });

  try {
    const response = await fetch({
      url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
      token: window.appConfig?.token,
      method: 'DELETE',
      queryParameters: {id},
    });

    if (response.ok !== true) {
      throw new Error('fetch_failed');
    }

    const responseData = (await response.json()) as AlwatrServiceResponse<never>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }
  }
  catch (error) {
    showToastSignal.dispatch({
      message: 'عملیات با خطا رو به رو شد',
    });
  }

  jobListSignal.request({});

  loadingSignal.request({
    key: 'job-delete',
    status: 'end',
  });
});
