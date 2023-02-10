import {message} from '../director/l18e-loader.js';
import {userComposer} from '../lib/bot.js';

userComposer.command('menu', async (ctx) => {
  if (ctx.chatId == null) return;

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
