import {fetchContext} from '@alwatr/fetch';
import {l18eReadyPromise} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {config} from '../../config.js';
import {logger} from '../logger.js';

export const fetchProductStorage = async (productStorageName = 'tile'): Promise<void> => {
  logger.logMethod('fetchProductStorage');

  try {
    await fetchContext(
        `product-storage-${productStorageName}-context`,
        {
          ...config.fetchContextOptions,
          url: config.api + '/product-list/',
          queryParameters: {
            storage: productStorageName,
          },
        },
        {debounce: 'NextCycle'},
    );
  }
  catch (err) {
    // TODO: refactor
    logger.error('provideProductStorageContext', 'fetch_failed', err);
    await l18eReadyPromise;
    const response = await snackbarSignalTrigger.requestWithResponse({
      messageKey: 'fetch_failed',
      actionLabelKey: 'retry',
      duration: -1,
    });
    if (response.actionButton) {
      await fetchProductStorage(productStorageName);
    }
  }
};
