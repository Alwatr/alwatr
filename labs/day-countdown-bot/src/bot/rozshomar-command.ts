import {sendDayCountdownMessage} from '../dayCountdown.js';
import {userComposer} from '../lib/bot.js';
import {dateDistance, nime} from '../lib/calender.js';

userComposer.command('rozshomar', async (ctx): Promise<void> => {
  await sendDayCountdownMessage(ctx.chatId as string | number, dateDistance(nime.valueOf()));
});
