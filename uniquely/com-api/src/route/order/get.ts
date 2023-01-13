import {logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {orderStorageClient} from '../../lib/storage.js';
import {tokenGenerator} from '../../token.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

// Get current order object
nanoServer.route('GET', '/order', getOrder);

async function getOrder(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('getOrder');

  const params = connection.requireQueryParams<{userId: string}>({userId: 'string'});

  const token = connection.requireToken((token: string) => {
    const isValid = tokenGenerator.verify(params.userId, token);
    return isValid === 'valid';
  });

  try {
    return await orderStorageClient.getStorage(token);
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
