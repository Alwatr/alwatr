import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';

bot.command('help', async (ctx) => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('action/help', {chatId: ctx.chatId});

  await ctx.replyToChat(message('action_help'));

  await ctx.answerCbQuery();
});
