import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {AlwatrServiceResponse} from '@alwatr/type';
import type {Product} from '@alwatr/type/src/customer-order-management.js';

nanoServer.route('GET', '/product/', getProduct);

async function getProduct(): Promise<AlwatrServiceResponse> {
  logger.logMethod('getProduct');
  return await storageClient.getStorage<Product>(config.storage.productStorageName);
}
