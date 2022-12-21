import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Order} from './type.js';

export const storageClient = new AlwatrStorageClient<Order>(config.storage);
