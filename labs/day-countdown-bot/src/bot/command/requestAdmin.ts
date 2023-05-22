import {config, logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {addAdmin, isAdmin} from '../../util/admin.js';

bot.defineCommandHandler('requestAdmin', async (context) => {
  logger.logMethod?.('command-requestAdmin');
  const params = context.commandParams ?? [];
  const token = params[0];
  if (token !== config.bot.adminToken) {
    logger.incident?.('command-requestAdmin', 'invalid_token', 'invalid admin token');
    return;
  }

  if (await isAdmin(context.chatId, context.messageThreadId) === true) {
    context.reply(message('admin_added_yet'));
  }
  else {
    addAdmin(context.chatId, context.messageThreadId);
    context.reply(message('admin_added_successfully'));
  }
});
