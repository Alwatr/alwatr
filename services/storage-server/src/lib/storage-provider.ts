import {AlwatrStorageEngineProvider} from '@alwatr/storage-engine/provider.js';

import {config} from '../config.js';

export const storageProvider = new AlwatrStorageEngineProvider(config.storage);
