import {deleteAdmin} from '../admin.js';
import {message} from '../director/l18e-loader.js';
import {botAdminComposer} from '../lib/bot.js';

botAdminComposer.command('deleteAdmin', async (ctx) => {
  deleteAdmin(ctx.chatId as number);
  await ctx.replyToChat(message('command_delete_admin_success'));
});
