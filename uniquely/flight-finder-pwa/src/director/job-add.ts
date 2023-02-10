import {type AlwatrServiceResponse, fetch} from '@alwatr/fetch';
import {commandTrigger, eventListener, requestableContextConsumer} from '@alwatr/signal';

import type {Job} from '@alwatr/type/flight-finder.js';

eventListener.subscribe<Job>('job-add', async (job) => {
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
    commandTrigger.request('toast', {
      message: 'عملیات با خطا رو به رو شد',
    });
  }

  requestableContextConsumer.request('job-document-storage', null);
});
