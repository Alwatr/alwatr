import {type AlwatrDocumentObject, AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from '../config.js';

export const storageEngine = new AlwatrStorageEngine<AlwatrDocumentObject>(config.storage);
