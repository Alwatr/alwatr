import {sendDayCountdownMessage} from '../dayCountdown.js';
import {userComposer} from '../lib/bot.js';
import {dateDistance, nime} from '../lib/calender.js';

userComposer.command('rozshomar', async (ctx): Promise<void> => {
  if (ctx.chatId == null) return;

  await sendDayCountdownMessage(ctx.chatId, dateDistance(nime.valueOf()));
});
