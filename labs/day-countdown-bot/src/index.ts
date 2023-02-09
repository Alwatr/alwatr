import {logger} from './config.js';
import {sendDayCountDownToAllChat} from './dayCountdown.js';
import {nextDayCountdownDuration} from './lib/calender.js';
import {launchBot} from './lib/launch.js';

import './director/index.js';
import './bot/start-command.js';
import './bot/menu-command.js';
import './bot/help-action.js';
import './bot/subscribe-action.js';
import './bot/unsubscribe-action.js';
import './bot/rozshomar-command.js';

logger.logOther('..:: Day Countdown Telegram Bot ::..');

await launchBot();

// run on 9:00am on every day!
const duration = nextDayCountdownDuration(6);
setTimeout(async () => {
  await sendDayCountDownToAllChat();
  setInterval(sendDayCountDownToAllChat, 86400000);
}, duration);
