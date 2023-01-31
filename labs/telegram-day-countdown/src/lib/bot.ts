import {Telegraf} from 'telegraf';

import {config} from '../config.js';

export const bot = new Telegraf(config.telegramBot.token);
