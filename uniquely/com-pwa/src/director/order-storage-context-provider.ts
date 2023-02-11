import {fetchContext} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';

import {logger} from './logger.js';
import {config} from '../config.js';

const provideOrderStorageContext = async (): Promise<void> => {
  logger.logMethod('provideOrderStorageContext');

  try {
    await fetchContext('order-storage-context', {
      method: 'GET',
      url: config.api + '/order/',
      token: config.token,
    });
  }
  catch (err) {
    logger.error('provideOrderStorageContext', 'fetch_failed', err);

    const response = await snackbarSignalTrigger.requestWithResponse({
      message: message('fetch_failed'),
      actionLabel: message('retry'),
      duration: -1,
    });
    if (response.actionButton) {
      provideOrderStorageContext();
    }
  }
};

provideOrderStorageContext();
