import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {jobListSignal} from './job-list';

import type {Job, ServerResponse} from '../type';

declare global {
  interface AlwatrSignals {
    readonly 'job-add': Pick<Job, 'filter'>;
  }
}

export const jobAddSignal = new SignalInterface('job-add');

jobAddSignal.addListener(async (job) => {
  try {
    const respnse = await fetch({
      url: '',
      token: '',
      method: 'PUT',
      bodyJson: job,
    });

    if (respnse.ok !== true) {
      throw new Error('fetch_failed');
    }

    const responseData = (await respnse.json()) as ServerResponse<never>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }
  }
  catch (error) {
    // TODO: show toast
  }

  jobListSignal.request();
});
