import {deleteAdmin} from '../admin.js';
import {message} from '../director/l18e-loader.js';
import {adminComposer} from '../lib/bot.js';

adminComposer.command('deleteAdmin', async (ctx) => {
  deleteAdmin(ctx.chatId as number);
  await ctx.replyToChat(message('command_delete_admin_success'));
});
