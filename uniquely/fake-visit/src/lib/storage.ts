import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Count} from '../type.js';

export const storageClient = new AlwatrStorageClient<Count>(config.storage);
