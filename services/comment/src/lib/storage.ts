import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {Message} from '@alwatr/type/chat.js';


export const storageClient = new AlwatrStorageClient<Message>(config.storage);
