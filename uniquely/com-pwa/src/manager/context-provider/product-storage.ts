import {fetchContext} from '@alwatr/fetch';
import {l18eReadyPromise, message} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {config} from '../../config.js';
import {logger} from '../logger.js';

export const fetchProductStorage = async (productStorageName = 'tile'): Promise<void> => {
  logger.logMethod('fetchProductStorages');

  try {
    const fetchPromiseList = [];

    fetchPromiseList.push(fetchContext(
        `product-storage-${productStorageName}-context`,
        {
          ...config.fetchContextOptions,
          url: config.api + '/product-list/',
          queryParameters: {
            storage: productStorageName,
          },
        },
        {debounce: 'NextCycle'},
    ));
    fetchPromiseList.push(fetchContext(
        `price-list-storage-${productStorageName}-context`,
        {
          ...config.fetchContextOptions,
          url: config.api + '/price-list/',
          queryParameters: {
            name: config.priceListName.replace('${productStorage}', productStorageName),
          },
        },
        {debounce: 'NextCycle'},
    ));
    fetchPromiseList.push(fetchContext(
        `final-price-list-storage-${productStorageName}-context`,
        {
          ...config.fetchContextOptions,
          url: config.api + '/price-list/',
          queryParameters: {
            name: config.finalPriceListName.replace('${productStorage}', productStorageName),
          },
        },
        {debounce: 'NextCycle'},
    ));

    (await Promise.all(fetchPromiseList)).length = 0;
    fetchPromiseList.length = 0;
  }
  catch (err) {
    // TODO: refactor
    logger.error('provideProductStorageContext', 'fetch_failed', err);
    await l18eReadyPromise;
    const response = await snackbarSignalTrigger.requestWithResponse({
      message: message('fetch_failed'),
      actionLabel: message('retry'),
      duration: -1,
    });
    if (response.actionButton) {
      await fetchProductStorage(productStorageName);
    }
  }
};
