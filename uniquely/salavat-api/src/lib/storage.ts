import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from '../config.js';

import type {TotalSalavatCount} from '@alwatr/type/salavat.js';

export const storageEngine = new AlwatrStorageEngine<TotalSalavatCount>(config.storage);
