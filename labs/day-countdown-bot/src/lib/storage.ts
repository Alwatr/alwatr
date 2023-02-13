import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from '../config.js';

import type {BotSetting, Chat} from '../type.js';

export const chatStorageEngine = new AlwatrStorageEngine<Chat>(config.chatStorage);
export const configStorageEngine = new AlwatrStorageEngine<BotSetting>(config.configStorage);
