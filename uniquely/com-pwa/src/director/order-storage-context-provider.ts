import {fetchContext} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/src/snackbar/show-snackbar.js';

import {logger} from './logger.js';
import {config} from '../config.js';
import {orderStorageContextProvider, orderStorageContextConsumer, userContextConsumer} from '../context.js';

orderStorageContextProvider.setProvider(async (args) => {
  logger.logMethod('orderStorageContextProvider');

  const userContext = userContextConsumer.getValue() ?? await userContextConsumer.untilChange();

  try {
    await fetchContext('order-storage-context', {
      method: 'GET',
      url: config.api + '/order/',
      queryParameters: {
        userId: userContext.id,
      },
      token: config.token,
    });
  }
  catch (err) {
    logger.error('orderStorageContextProvider', 'fetch_failed', err);

    const response = await snackbarSignalTrigger.requestWithResponse({
      message: message('fetch_failed'),
      actionLabel: message('retry'),
      duration: -1,
    });
    if (response.actionButton) {
      orderStorageContextConsumer.request(args);
    }
  }
});

orderStorageContextConsumer.request(null);
