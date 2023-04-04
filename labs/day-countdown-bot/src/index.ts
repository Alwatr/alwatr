import './bot/addChat.js';
import './bot/callback-query/help.js';
import './bot/callback-query/toggleSubscribe.js';
import './bot/command/help.js';
import './bot/command/notify.js';
import './bot/command/requestAdmin.js';
import './bot/command/setting.js';
import './bot/command/signin.js';
import './bot/command/start.js';
import {logger} from './config.js';
import './director/index.js';
import {launchBot} from './lib/launch.js';

logger.logOther('..:: Day Countdown Telegram Bot ::..');
launchBot();
