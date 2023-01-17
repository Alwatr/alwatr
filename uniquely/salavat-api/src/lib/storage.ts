import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from '../config.js';

import type {GlobalSalavatCount} from '@alwatr/type/salavat.js';

export const storageEngine = new AlwatrStorageEngine<GlobalSalavatCount>(config.storage);
