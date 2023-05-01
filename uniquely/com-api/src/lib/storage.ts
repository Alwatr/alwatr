import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from './config.js';

import type {ComUser} from '@alwatr/type/customer-order-management.js';

export const storageClient = new AlwatrStorageClient(config.storageClient);

export const userStorage = new AlwatrStorageClient<ComUser>({
  ...config.storageClient,
  name: config.userStorageName,
});
