import {logger} from './config.js';
import {notify} from './dayCountdown.js';
import {launchBot} from './lib/launch.js';

import './command/start.js';

logger.logOther('..:: Day Countdown Telegram Bot ::..');

launchBot();
setInterval(notify, 5_000);
