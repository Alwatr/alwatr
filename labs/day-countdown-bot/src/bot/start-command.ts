import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';

bot.command('start', async (ctx): Promise<void> => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('command/start', {chatId: ctx.chatId});

  await ctx.replyToChat(message('command_start'), {
    reply_markup: {
      inline_keyboard: [[{text: message('button_subscribe'), callback_data: 'subscribe'}]],
    },
  });
});
