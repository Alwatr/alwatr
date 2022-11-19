import {AlwatrStorageClient} from '@alwatr/storage-client';
import {config} from './config.js';
import type {Job} from './type';

export const stroage = new AlwatrStorageClient<Job>({
  name: config.storageName,
  host: config.storageHost,
  token: config.storageToken,
});
