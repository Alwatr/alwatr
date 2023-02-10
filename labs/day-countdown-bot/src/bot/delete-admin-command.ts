import {deleteAdmin} from '../admin.js';
import {message} from '../director/l18e-loader.js';
import {adminComposer} from '../lib/bot.js';

adminComposer.command('deleteAdmin', async (ctx) => {
  if (ctx.chatId == null) return;

  deleteAdmin(ctx.chatId);
  await ctx.replyToChat(message('command_delete_admin_success'));
});
