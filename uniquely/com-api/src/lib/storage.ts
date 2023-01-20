import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

export const storageClient = new AlwatrStorageClient(config.storage);
