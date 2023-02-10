import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from '../config.js';

import type {BotSetting, User} from '../type.js';

export const chatStorageEngine = new AlwatrStorageEngine<User>(config.userStorage);
export const configStorageEngine = new AlwatrStorageEngine<BotSetting>(config.configStorage);
