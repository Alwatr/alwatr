import './bot/command/help.js';
import './bot/command/setting.js';
import './bot/command/start.js';
import {logger} from './config.js';
import './director/index.js';
import {bot} from './lib/bot.js';

await bot.setWebhook();
logger.logOther('..:: Day Countdown Telegram Bot ::..');
