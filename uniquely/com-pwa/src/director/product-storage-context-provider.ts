import {fetchContext} from '@alwatr/fetch';
import {l18eReadyPromise, message} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {logger} from '../manager/logger.js';
import {config} from '../config.js';

const provideProductStorageContext = async (): Promise<void> => {
  logger.logMethod('provideProductStorageContext');

  try {
    const fetchPromiseList = [];

    for (const productStorageName of config.productStorageList) {
      fetchPromiseList.push(fetchContext(
          `product-storage-${productStorageName}-context`,
          {
            ...config.fetchContextOptions,
            url: config.api + '/product-list/',
            queryParameters: {
              storage: productStorageName,
            },
          },
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
      ));
    }

    (await Promise.all(fetchPromiseList)).length = 0;
    fetchPromiseList.length = 0;
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
