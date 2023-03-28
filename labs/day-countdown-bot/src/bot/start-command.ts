import {addChat, isChatExists} from '../chat.js';
import {message} from '../director/l18e-loader.js';
import {bot, userComposer} from '../lib/bot.js';

userComposer.command('start', async (ctx): Promise<void> => {
  if (!isChatExists(ctx.chatId)) addChat(await bot.getChatDetail(ctx));
  addChat(await bot.getChatDetail(ctx));

  await ctx.replyToChat(message('command_start'), {
    reply_markup: {
      inline_keyboard: [[{text: message('button_subscribe'), callback_data: 'subscribe'}]],
    },
  });
});
