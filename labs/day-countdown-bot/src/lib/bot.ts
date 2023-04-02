import {AlwatrTelegram} from '@alwatr/telegram';

import {config} from '../config.js';

export const bot = new AlwatrTelegram(config.telegramBot);

await bot.setWebhook();
