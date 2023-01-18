import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {AlwatrDocumentObject} from '@alwatr/type';

export const storageClient = new AlwatrStorageClient<AlwatrDocumentObject>(config.storage);
