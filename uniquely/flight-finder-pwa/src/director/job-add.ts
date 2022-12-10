import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {jobListSignal} from './job-list';
import {loadingSignal} from './loading';
import {showToastSignal} from './toast';

import type {Job} from '../type';
import type {AlwatrServiceResponse} from '@alwatr/fetch';

export const jobAddSignal = new SignalInterface('job-add');

jobAddSignal.addListener(async (job) => {
  loadingSignal.request({
    key: 'job-add',
    status: 'start',
  });

  try {
    const response = await fetch({
      url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
      token: window.appConfig?.token,
      method: 'PUT',
      bodyJson: job,
    });

    if (response.ok !== true) {
      throw new Error('fetch_failed');
    }

    const responseData = (await response.json()) as AlwatrServiceResponse<Job>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }
  }
  catch (error) {
    showToastSignal.dispatch({
      message: 'عملیات با خطا رو به رو شد',
    });
  }

  loadingSignal.request({
    key: 'job-add',
    status: 'end',
  });
  jobListSignal.request({});
});
