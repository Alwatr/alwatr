import {logger} from '../config.js';
import {sendDayCountdownMessage} from '../dayCountdown.js';
import {bot} from '../lib/bot.js';
import {dateDistance, nime} from '../lib/calender.js';

bot.command('rozshomar', async (ctx): Promise<void> => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('command/rozshomar', {chatId: ctx.chatId});

  await sendDayCountdownMessage(ctx.chatId, dateDistance(nime.valueOf()));
});
