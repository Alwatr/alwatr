import {addChat, isSubscribed} from '../chat.js';
import {message} from '../director/l18e-loader.js';
import {bot, userComposer} from '../lib/bot.js';

userComposer.command('menu', async (ctx) => {
  // if (!isChatExists(ctx.chatId)) addChat(await bot.getChatDetail(ctx));
  addChat(await bot.getChatDetail(ctx));

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
          isSubscribed(ctx.chatId) ? {
            text: message('button_unsubscribe'),
            callback_data: 'unsubscribe',
          } : {
            text: message('button_subscribe'),
            callback_data: 'subscribe',
          },
        ],
      ],
    },
  });
});
