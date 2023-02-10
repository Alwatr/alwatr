import {logger} from '../config.js';
import {sendDayCountDown} from '../dayCountdown.js';
import {message} from '../director/l18e-loader.js';
import {userComposer} from '../lib/bot.js';
import {chatStorageEngine} from '../lib/storage.js';
import {isSubscribed} from '../user.js';

userComposer.action('subscribe', async (ctx) => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('action/subscribe', {chatId: ctx.chatId});

  if (!isSubscribed(ctx.chatId)) {
    chatStorageEngine.set({id: ctx.chatId.toString()});
    const response = await ctx.sendMessageToChat(message('action_subscribe_success'));
    if (response == null) return;

    await sendDayCountDown(ctx.chatId);
  }
  else {
    await ctx.sendMessageToChat(message('action_subscribe_added_before'));
  }

  await ctx.answerCbQuery();
});
