import {logger} from './config.js';
import {launchBot} from './lib/launch.js';

import './command/start.js';
import './bot/command/start.js';
import './route/home.js';
import './route/notify.js';

logger.logOther('..:: Telegram Notifier ::..');

launchBot();
