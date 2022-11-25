import {fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {jobListSignal} from './job-list';
import {showToastSignal} from './toast';

import type {ServerResponse} from '../type';

export const jobDeleteSignal = new SignalInterface('job-delete');

jobDeleteSignal.addListener(async (id) => {
  try {
    const response = await fetch({
      url: window.appConfig?.api ?? '/job',
      token: window.appConfig?.token,
      method: 'DELETE',
      queryParameters: {id},
    });

    if (response.ok !== true) {
      throw new Error('fetch_failed');
    }

    const responseData = (await response.json()) as ServerResponse<never>;

    if (responseData.ok !== true) {
      throw new Error('fetch_failed');
    }
  }
  catch (error) {
    showToastSignal.request({
      message: (error as Error).message,
    });
  }

  jobListSignal.request();
});
