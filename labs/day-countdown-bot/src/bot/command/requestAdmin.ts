import {config, logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {addAdmin, isAdmin} from '../../util/admin.js';

bot.defineCommandHandler('requestAdmin', (context) => {
  logger.logMethod('command-requestAdmin');
  const params = context.commandParams ?? [];
  const token = params[0];
  if (token !== config.admin.adminToken) {
    logger.incident('command-requestAdmin', 'invalid_token', 'invalid admin token');
    return;
  }

  if (isAdmin(context.chatId) === true) {
    context.reply(message('admin_added_yet'));
  }
  else {
    addAdmin(context.chatId);
    context.reply(message('admin_added_successfully'));
  }
});
