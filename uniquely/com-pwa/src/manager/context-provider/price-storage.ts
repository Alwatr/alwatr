import {fetchContext} from '@alwatr/fetch';
import {l18eReadyPromise} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {config} from '../../config.js';
import {logger} from '../logger.js';

export const fetchPriceStorage = async (productStorageName = 'tile'): Promise<void> => {
  logger.logMethod('fetchPriceStorage');

  try {
    void await Promise.all([
      fetchContext(
          `price-storage-${productStorageName}-context`,
          {
            ...config.fetchContextOptions,
            url: config.api + '/price-list/',
            queryParameters: {
              name: config.priceListName.replace('${productStorage}', productStorageName),
            },
          },
          {debounce: 'NextCycle'},
      ),
      fetchContext(
          `final-price-storage-${productStorageName}-context`,
          {
            ...config.fetchContextOptions,
            url: config.api + '/price-list/',
            queryParameters: {
              name: config.finalPriceListName.replace('${productStorage}', productStorageName),
            },
          },
          {debounce: 'NextCycle'},
      ),
    ]);
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
      await fetchPriceStorage(productStorageName);
    }
  }
};
