import {deleteAdmin, isAdmin} from '../admin.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';

bot.command('deleteAdmin', async (ctx) => {
  if (ctx.chatId == null) return;
  logger.logMethodArgs('command/deleteAdmin', {chatId: ctx.chatId});

  ctx.isAdminCallback = isAdmin;
  ctx.onSendMessageForbidden = deleteAdmin;
  if (!ctx.isAdmin) return;

  deleteAdmin(ctx.chatId);
  await ctx.replyToChat(message('command_delete_admin_success'));
});
