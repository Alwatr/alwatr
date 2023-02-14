import {fetchContext} from '@alwatr/fetch';
import {l18eReadyPromise, message} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {logger} from './logger.js';
import {config} from '../config.js';

const provideProductStorageContext = async (): Promise<void> => {
  logger.logMethod('provideProductStorageContext');

  try {
    await fetchContext('product-storage-context', {
      method: 'GET',
      url: config.api + '/product/',
      token: config.token,
      removeDuplicate: 'auto',
      retry: 10,
      retryDelay: 3_000,
    });
  }
  catch (err) {
    logger.error('provideProductStorageContext', 'fetch_failed', err);
    await l18eReadyPromise;
    const response = await snackbarSignalTrigger.requestWithResponse({
      message: message('fetch_failed'),
      actionLabel: message('retry'),
      duration: -1,
    });
    if (response.actionButton) {
      provideProductStorageContext();
    }
  }
};

provideProductStorageContext();
