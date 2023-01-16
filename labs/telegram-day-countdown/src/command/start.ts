import {logger} from '../config.js';
import {bot} from '../lib/bot.js';

bot.command('start', async (ctx): Promise<void> => {
  const chatId = ctx.chat.id;
  logger.logMethodArgs('command/start', {chatId});

  ctx.reply(`Hello 🤚\nWellcome to Alwatr Day count Bot!`, {
    reply_markup: {
      inline_keyboard: [[{text: 'Start Day Countdown', callback_data: 'daycountdown'}]],
    },
  });
});
