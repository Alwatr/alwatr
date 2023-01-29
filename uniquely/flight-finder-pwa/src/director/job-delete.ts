import {type AlwatrServiceResponse, fetch} from '@alwatr/fetch';
import {commandTrigger, eventListener, requestableContextConsumer} from '@alwatr/signal';

eventListener.subscribe<{id: string}>('job-delete', async (detail) => {
  try {
    const response = await fetch({
      url: window.appConfig?.api ? window.appConfig.api + '/job' : '/job',
      token: window.appConfig?.token,
      method: 'DELETE',
      queryParameters: {id: detail.id},
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
    commandTrigger.request('toast', {
      message: 'عملیات با خطا رو به رو شد',
    });
  }

  requestableContextConsumer.request('job-delete', null);
});
