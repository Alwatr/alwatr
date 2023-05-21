import {AlwatrStorageClient} from '@alwatr/storage-client';

import {config} from '../config.js';

import type {BotSetting, Content, DayCountdownChat, Conversation} from '../type.js';

export const chatStorageClient = new AlwatrStorageClient<DayCountdownChat>({name: 'chat', ...config.storageClient});
export const configStorageClient = new AlwatrStorageClient<BotSetting>({name: 'config', ...config.storageClient});
export const conversationStorageClient =
  new AlwatrStorageClient<Conversation>({name: 'conversation', ...config.storageClient});
export const contentStorageClient = new AlwatrStorageClient<Content>(config.storageClient);
