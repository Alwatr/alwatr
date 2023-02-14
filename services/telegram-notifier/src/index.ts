import './bot/command/start.js';
import {launchBot} from './bot/launch.js';
import {logger} from './config.js';
import './route/home.js';
import './route/notify.js';

logger.logOther('..:: Alwatr Telegram Notify Nanoservice ::..');

launchBot();
