import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {orderStorageClient} from '../../lib/storage.js';

import type {AlwatrServiceResponse} from '@alwatr/type';

// Get current product object
nanoServer.route('GET', '/product', getProduct);

async function getProduct(): Promise<AlwatrServiceResponse> {
  logger.logMethod('getProduct');

  try {
    return await orderStorageClient.getStorage(config.productStorage.name);
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('getProduct', err.message || 'storage_error', err);
    return {
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
      meta: {
        name: err.name,
        message: err.message,
        cause: err.cause,
      },
    };
  }
}
