import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Job} from '@alwatr/type/flight-finder.js';

export const storageClient = new AlwatrStorageClient<Job>(config.storage);
