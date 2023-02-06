import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {RecordItem} from '../type.js';

export const storageClient = new AlwatrStorageClient<RecordItem>(config.storage);
