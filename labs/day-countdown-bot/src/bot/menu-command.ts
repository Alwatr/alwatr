import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';

bot.command('menu', async (ctx) => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('command/menu', {chatId: ctx.chatId});

  await ctx.replyToChat(message('command_menu'), {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: message('button_help'),
            callback_data: 'help',
          },
        ],
        [
          {
            text: message('button_unsubscribe'),
            callback_data: 'unsubscribe',
          },
        ],
      ],
    },
  });
});
