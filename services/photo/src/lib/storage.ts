import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Photo} from '@alwatr/type/photo.js';

export const storageClient = new AlwatrStorageClient<Photo>(config.storage);
