import {AlwatrStorageClient, DocumentObject} from '@alwatr/storage-client';
import {config} from './config.js';
import type {Job} from './type';

export const stroage = new AlwatrStorageClient<Job & DocumentObject>({
  name: config.storageName,
  host: config.storageServerHost,
  token: config.storageToken!,
});
