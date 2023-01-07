import {logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {orderStorageClient} from '../../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

// Get current order object
nanoServer.route('GET', '/order', getOrder);

async function getOrder(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('getOrder');

  const token = connection.requireToken(() => {
    // validate with @alwatr/token
    return true;
  });

  orderStorageClient.config.name = token;

  try {
    return {
      ok: true,
      data: await orderStorageClient.getStorage(),
    };
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('getOrder', err.message || 'storage_error', err);
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
