import {fetchContext} from '@alwatr/fetch';
import {message, l18eReadyPromise} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {logger} from './logger.js';
import {config} from '../config.js';
import {
  orderStorageContextProvider,
  orderStorageContextConsumer,
  userContextConsumer,
} from '../context.js';

orderStorageContextProvider.setProvider(async (args): Promise<void> => {
  logger.logMethod('orderStorageContextProvider');

  const userContext = userContextConsumer.getValue() ?? (await userContextConsumer.untilChange());

  try {
    await fetchContext('order-storage-context', {
      method: 'GET',
      url: config.api + '/order-list/',
      queryParameters: {
        userId: userContext.id,
      },
      token: config.token,
      retry: 10,
      retryDelay: 3_000,
    });
  }
  catch (err) {
    logger.error('orderStorageContextProvider', 'fetch_failed', err);

    await l18eReadyPromise;
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
