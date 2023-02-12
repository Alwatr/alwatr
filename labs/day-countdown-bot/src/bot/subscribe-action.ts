import {sendDayCountDown} from '../dayCountdown.js';
import {message} from '../director/l18e-loader.js';
import {chatAdminComposer} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';
import {isSubscribed} from '../user.js';

chatAdminComposer.action('subscribe', async (ctx) => {
  if (isSubscribed(ctx.chatId as number | string)) {
    await ctx.answerCbQuery(message('action_subscribe_added_before'));
    return;
  }
  else {
    chatStorageEngine.set({id: (ctx.chatId as number | string).toString()});
    const response = await ctx.sendMessageToChat(message('action_subscribe_success'));
    if (response == null) return; // cannot send message!
  }

  await sendDayCountDown(ctx.chatId as number | string);
  await ctx.answerCbQuery();
});
