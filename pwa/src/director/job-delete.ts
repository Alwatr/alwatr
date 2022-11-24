import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {jobListSignal} from './job-list';

import type {ServerResponse} from '../type';

declare global {
  interface AlwatrSignals {
    readonly 'job-delete': string;
  }
}

export const jobDeleteSignal = new SignalInterface('job-delete');

jobDeleteSignal.addListener(async (id) => {
  try {
    const respnse = await fetch({
      url: '',
      token: '',
      method: 'DELETE',
      queryParameters: {id},
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
