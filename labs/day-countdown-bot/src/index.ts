import './bot/callback-query/toggleSubscribe.js';
import './bot/command/dayCountdown.js';
import './bot/command/getContent.js';
import './bot/command/help.js';
import './bot/command/invitation.js';
import './bot/command/notify.js';
import './bot/command/requestAdmin.js';
import './bot/command/setContent.js';
import './bot/command/start.js';
import {logger} from './config.js';
import {dayCountdown} from './day-countdown.js';
import './director/index.js';
import {launchBot} from './lib/launch.js';
import './util/admin.js';

logger.logOther?.('..:: Day Countdown Telegram Bot ::..');

await launchBot();
await dayCountdown();
