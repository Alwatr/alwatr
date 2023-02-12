import {deleteChat, isSubscribed} from '../chat.js';
import {message} from '../director/l18e-loader.js';
import {chatAdminComposer} from '../lib/bot.js';

chatAdminComposer.action('unsubscribe', async (ctx) => {
  if (isSubscribed(ctx.chatId)) {
    deleteChat(ctx.chatId);
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
