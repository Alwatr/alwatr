import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';
import {Message} from './type.js';

export const storage = new AlwatrStorageClient<Message>(config.storage);
