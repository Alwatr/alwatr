import {addAdmin, isAdmin} from '../admin.js';
import {config} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {userComposer} from '../lib/bot.js';

userComposer.command('setAdmin', async (ctx) => {
  const token = ctx.commandArgs;
  if (token == null || ctx.chatId == null) return;

  ctx.isAdminCallback = isAdmin;

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
