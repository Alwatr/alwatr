import {AlwatrStorageProvider} from '@alwatr/storage/provider.js';

import {config} from './config.js';

export const storageProvider = new AlwatrStorageProvider({path: config.storagePath});
