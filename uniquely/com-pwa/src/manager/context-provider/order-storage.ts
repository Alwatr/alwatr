import {fetchContext} from '@alwatr/fetch';
import {l18eReadyPromise} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {config} from '../../config.js';
import {
  orderStorageContextConsumer,
  userContextConsumer,
} from '../context.js';
import {logger} from '../logger.js';

export const fetchOrderStorage = async (): Promise<void> => {
  logger.logMethod('fetchOrderStorage');

  const userContext = userContextConsumer.getValue() ?? (await userContextConsumer.untilChange());

  try {
    await fetchContext(
        orderStorageContextConsumer.id,
        {
          ...config.fetchContextOptions,
          url: config.api + '/order-list/',
          queryParameters: {
            userId: userContext.id,
          },
        },
        {debounce: 'NextCycle'},
    );
  }
  catch (err) {
    // TODO: refactor
    logger.error('fetchOrderStorage', 'fetch_failed', err);
    await l18eReadyPromise;
    const response = await snackbarSignalTrigger.requestWithResponse({
      messageKey: 'fetch_failed',
      actionLabelKey: 'retry',
      duration: orderStorageContextConsumer.getValue() == null ? -1 : 5_000,
    });
    if (response.actionButton) {
      await fetchOrderStorage();
    }
  }
};
