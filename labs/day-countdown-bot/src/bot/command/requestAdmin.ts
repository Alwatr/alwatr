import {config, logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {addAdmin} from '../../util/admin.js';

bot.defineCommandHandler('requestAdmin', async (context) => {
  logger.logMethod?.('command-requestAdmin');
  const params = context.commandParams ?? [];
  const token = params[0];
  if (token !== config.bot.adminToken) {
    logger.incident?.('command-requestAdmin', 'invalid_token', 'invalid admin token');
    return;
  }

  addAdmin(context.chatId, context.messageThreadId);
  context.reply(message('admin_added_successfully'));
});
