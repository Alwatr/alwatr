import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {ChatMessage} from '@alwatr/type';

export const storageClient = new AlwatrStorageClient<ChatMessage>(config.storage);
