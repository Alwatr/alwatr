import {Telegraf} from 'telegraf';

import {config, logger} from './config.js';

export const bot = new Telegraf(config.telegramBot.token);

await bot.launch();

logger.logProperty('getMe', await bot.telegram.getMe());
