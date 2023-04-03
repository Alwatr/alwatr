import {AlwatrStorageEngine} from '@alwatr/storage-engine';

import {config} from '../config.js';

import type {BotSetting, DayCountdownChat} from '../type.js';

export const chatStorageEngine = new AlwatrStorageEngine<DayCountdownChat>(config.chatStorage);
export const configStorageEngine = new AlwatrStorageEngine<BotSetting>(config.configStorage);
