import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import type {Job, ServerResponse} from '../type';

declare global {
  interface AlwatrSignals {
    readonly 'job-list': Array<Job>;
  }
  interface AlwatrRequestSignals {
    readonly 'job-list': void;
  }
}

export const jobListSignal = new SignalInterface('job-list');

jobListSignal.setProvider(async () => {
  try {
    const respnse = await fetch({
      url: '',
      token: '',
      cacheStrategy: 'stale_while_revalidate',
    });

    if (respnse.ok !== true) {
      throw new Error('fetch_failed');
    }

    const responseData = (await respnse.json()) as ServerResponse<Record<string, Job>>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }

    return Object.values(responseData.data);
  }
  catch (error) {
    // TODO: show toast
    return;
  }
});

jobListSignal.request();
