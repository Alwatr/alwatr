import {message} from '../director/l18e-loader.js';
import {userComposer} from '../lib/bot.js';

userComposer.command('start', async (ctx): Promise<void> => {
  if (ctx.chatId == null) return;

  await ctx.replyToChat(message('command_start'), {
    reply_markup: {
      inline_keyboard: [[{text: message('button_subscribe'), callback_data: 'subscribe'}]],
    },
  });
});
