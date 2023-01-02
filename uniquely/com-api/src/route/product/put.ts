import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {productStorageClient} from '../../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';
import type {Product} from '@alwatr/type/com.js';

// Add product
nanoServer.route('PUT', '/product', newProduct);

async function newProduct(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('newProduct');

  connection.requireToken(config.nanoServer.accessToken);

  const product = await connection.requireJsonBody<Product>();

  product.id ??= 'auto_increment';

  try {
    return {
      ok: true,
      data: (await productStorageClient.set(product)),
    };
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('newProduct', err.message || 'storage_error', err);
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
