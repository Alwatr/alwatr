import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {jobListSignal} from './job-list';

import type {Job, ServerResponse} from '../type';

export const jobAddSignal = new SignalInterface('job-add');

jobAddSignal.addListener(async (job) => {
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

    const responseData = (await response.json()) as ServerResponse<Job>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }
  }
  catch (error) {
    // TODO: show toast
  }

  jobListSignal.request();
});
