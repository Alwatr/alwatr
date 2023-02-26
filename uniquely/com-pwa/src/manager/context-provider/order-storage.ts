import {fetchContext} from '@alwatr/fetch';
import {message, l18eReadyPromise} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {config} from '../../config.js';
import {
  orderStorageContextProvider,
  orderStorageContextConsumer,
  userContextConsumer,
} from '../context.js';
import {logger} from '../logger.js';

orderStorageContextProvider.setProvider(async (args): Promise<void> => {
  logger.logMethod('orderStorageContextProvider');

  const userContext = userContextConsumer.getValue() ?? (await userContextConsumer.untilChange());

  try {
    await fetchContext(orderStorageContextProvider.id, {
      ...config.fetchContextOptions,
      url: config.api + '/order-list/',
      queryParameters: {
        userId: userContext.id,
      },
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
