import {addChat, isChatExists, isSubscribed, subscribeChat} from '../chat.js';
import {sendDayCountDown} from '../dayCountdown.js';
import {message} from '../director/l18e-loader.js';
import {bot, chatAdminComposer} from '../lib/bot.js';

chatAdminComposer.action('subscribe', async (ctx) => {
  if (isSubscribed(ctx.chatId)) {
    await ctx.answerCbQuery(message('action_subscribe_added_before'));
    return;
  }

  // else
  if (!isChatExists(ctx.chatId)) addChat(await bot.getChatDetail(ctx));
  subscribeChat(ctx.chatId);

  const response = await ctx.sendMessageToChat(message('action_subscribe_success'));
  if (response == null) return; // cannot send message!

  await sendDayCountDown(ctx.chatId);
  await ctx.answerCbQuery();
});
