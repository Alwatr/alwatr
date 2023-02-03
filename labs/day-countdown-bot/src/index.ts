import {logger} from './config.js';
import {notify} from './dayCountdown.js';
import {nextDayCountdownDuration} from './lib/calender.js';
import {launchBot} from './lib/launch.js';

import './command/start.js';

logger.logOther('..:: Day Countdown Telegram Bot ::..');

launchBot();

// run on 9:00am on every day!
const duration = nextDayCountdownDuration(9);
setTimeout(async () => {
  await notify();
  setInterval(notify, 86400000);
}, duration);
