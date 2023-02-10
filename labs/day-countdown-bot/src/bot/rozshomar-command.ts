import {logger} from '../config.js';
import {sendDayCountdownMessage} from '../dayCountdown.js';
import {bot} from '../lib/bot.js';
import {dateDistance, nime} from '../lib/calender.js';

bot.command('rozshomar', async (ctx): Promise<void> => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/rozshomar', {chatId});

  try {
    await sendDayCountdownMessage(chatId, dateDistance(nime.valueOf()));
  }
  catch (err) {
    logger.error('command/rozshomar', 'send_message_failed', {err});
    return;
  }
});
