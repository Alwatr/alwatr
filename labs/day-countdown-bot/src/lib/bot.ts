import {AlwatrTelegram, AlwatrTelegramStorage} from '@alwatr/telegram';

import {chatStorageEngine} from './storage.js';
import {config} from '../config.js';

export const bot = new AlwatrTelegram(config.telegramBot);
export const botStorage = new AlwatrTelegramStorage(chatStorageEngine);
