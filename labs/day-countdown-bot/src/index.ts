import './bot/delete-admin-command.js';
import './bot/delete-notify-command.js';
import './bot/help-action.js';
import './bot/menu-command.js';
import './bot/notify-command.js';
import './bot/rozshomar-command.js';
import './bot/set-admin-command.js';
import './bot/start-command.js';
import './bot/subscribe-action.js';
import './bot/unsubscribe-action.js';
import {logger} from './config.js';
import {sendDayCountdownToAllChat} from './dayCountdown.js';
import './director/index.js';
import {bot} from './lib/bot.js';
import {nextDayCountdownDuration} from './lib/calender.js';
import {launchBot} from './lib/launch.js';

logger.logOther('..:: Day Countdown Telegram Bot ::..');

await launchBot();

// run on 9:00am on every day!
const duration = nextDayCountdownDuration(5, 30);
setTimeout(async () => {
  await sendDayCountdownToAllChat();
  setInterval(sendDayCountdownToAllChat, 86400000);
}, duration);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
