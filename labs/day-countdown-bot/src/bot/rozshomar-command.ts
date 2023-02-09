import {logger} from '../config.js';
import {sendDayCountDownMessage} from '../dayCountdown.js';
import {bot} from '../lib/bot.js';
import {dateDistance, nime} from '../lib/calender.js';

bot.command('rozshomar', (ctx): void => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/rozshomar', {chatId});

  sendDayCountDownMessage(chatId, dateDistance(nime.valueOf()));
});
