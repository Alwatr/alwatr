import {logger} from '../config.js';
import {sendDayCountDown} from '../dayCountdown.js';
import {bot} from '../lib/bot.js';
import {dateDistance, nime} from '../lib/calender.js';

bot.command('rozshomar', (ctx): void => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/rozshomar', {chatId});

  sendDayCountDown(chatId, dateDistance(nime.valueOf()));
});
