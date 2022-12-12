import './bot/command/start.js';
import './route/home.js';
import './route/notify.js';
import {launchBot} from './bot/launch.js';
import {logger} from './config.js';

logger.logOther('..:: Telegram Notifier ::..');

launchBot();
