import {logger} from '../config.js';
import {bot} from '../lib/bot.js';

bot.action('daycountdown', async (ctx): Promise<void> => {
  const chatId = ctx.chat?.id;
  logger.logMethodArgs('command/daycountdown', {chatId});

  if (chatId == null) return;

  // send req to api service
});
