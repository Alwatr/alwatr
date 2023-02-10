import {addAdmin} from '../admin.js';
import {config, logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';

bot.command('setAdmin', async (ctx) => {
  const token = ctx.commandArgs;
  if (token == null || ctx.chatId == null) return;
  logger.logMethodArgs('command/setAdmin', {chatId: ctx.chatId, token});

  if (token == config.telegramBot.adminToken) {
    if (ctx.isAdmin) {
      await ctx.replyToChat(message('command_set_admin_added_before'));
    }
    else {
      addAdmin(ctx.chatId);
      await ctx.replyToChat(message('command_set_admin_success'));
    }
  }
});
