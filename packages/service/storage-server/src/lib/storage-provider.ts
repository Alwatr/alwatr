import {AlwatrStorageProvider} from '../../storage-engine/src/provider.js';

import {config} from './config.js';

export const storageProvider = new AlwatrStorageProvider({path: config.storagePath});
