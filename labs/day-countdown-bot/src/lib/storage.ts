import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from '../config.js';

import type {User} from '../type.js';

export const storageEngine = new AlwatrStorageEngine<User>(config.storage);
