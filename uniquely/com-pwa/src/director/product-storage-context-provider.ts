import {fetchContext} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';

import {logger} from './logger.js';
import {config} from '../config.js';

const provideProductStorageContext = async (): Promise<void> => {
  logger.logMethod('provideProductStorageContext');

  try {
    await fetchContext('product-storage-context', {
      method: 'GET',
      url: config.api + '/product/',
      token: config.token,
    });
  }
  catch (err) {
    logger.error('provideProductStorageContext', 'fetch_failed', err);

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
