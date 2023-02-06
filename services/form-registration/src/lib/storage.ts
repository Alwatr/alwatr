import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Form} from '../type.js';

export const storageClient = new AlwatrStorageClient<Form>(config.storage);
