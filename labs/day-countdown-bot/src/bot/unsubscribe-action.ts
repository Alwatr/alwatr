import {message} from '../director/l18e-loader.js';
import {userComposer} from '../lib/bot.js';
import {deleteUser, isSubscribed} from '../user.js';

userComposer.action('unsubscribe', async (ctx) => {
  if (isSubscribed(ctx.chatId as string | number)) {
    deleteUser(ctx.chatId as string | number);
    await ctx.sendMessageToChat(message('action_unsubscribe_success'), {
      reply_markup: {
        inline_keyboard: [[
          {text: message('button_subscribe'), callback_data: 'subscribe'},
        ]],
      },
    });
  }
  else {
    await ctx.sendMessageToChat(message('action_unsubscribe_failed'), {
      reply_markup: {
        inline_keyboard: [[
          {text: message('button_subscribe'), callback_data: 'subscribe'},
        ]],
      },
    });
  }

  await ctx.answerCbQuery();
});
