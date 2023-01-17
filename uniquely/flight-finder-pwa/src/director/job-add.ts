import {type AlwatrServiceResponse, fetch} from '@alwatr/fetch';
import {SignalInterface} from '@alwatr/signal';

import {jobDocumentStorageSignal} from './job-document-storage.js';
import {showToastSignal} from './toast.js';

import type {Job} from '@alwatr/type/flight-finder.js';

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

  jobDocumentStorageSignal.request(null);
});
