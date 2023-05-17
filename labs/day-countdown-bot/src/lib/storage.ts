import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {BotSetting, DayCountdownChat} from '../type.js';

export const chatStorageClient = new AlwatrStorageClient<DayCountdownChat>({name: 'chat', ...config.storageClient});
export const configStorageClient = new AlwatrStorageClient<BotSetting>({name: 'config', ...config.storageClient});
export const conversationStorageClient = new AlwatrStorageClient(config.storageClient);
