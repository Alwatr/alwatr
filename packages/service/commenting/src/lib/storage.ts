import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from './config.js';
import {Comment} from './type.js';

export const storage = new AlwatrStorageClient<Comment>(config.storage);
