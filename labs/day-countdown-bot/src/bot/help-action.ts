import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {userComposer} from '../lib/bot.js';

userComposer.action('help', async (ctx) => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('action/help', {chatId: ctx.chatId});

  await ctx.replyToChat(message('action_help'));

  await ctx.answerCbQuery();
});
