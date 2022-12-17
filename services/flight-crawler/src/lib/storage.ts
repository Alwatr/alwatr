import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Job} from './type.js';

export const storage = new AlwatrStorageClient<Job>(config.storage);
