import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {SalavatVow} from '@alwatr/type/salavat.js';

export const storageClient = new AlwatrStorageClient<SalavatVow>(config.storage);
