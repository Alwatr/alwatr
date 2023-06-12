import {config, logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {addAdmin} from '../../util/admin.js';

bot.defineCommandHandler('requestAdmin', async (context) => {
  logger.logMethodArgs?.('command-requestAdmin', {chatId: context.chatId});

  const token = context.commandParams ? context.commandParams[0] : null;
  if (token !== config.bot.adminToken) {
    logger.incident?.('command-requestAdmin', 'invalid_token', 'invalid admin token');
    return;
  }

  await addAdmin(context.chatId, context.messageThreadId);
  context.reply(message('admin_added_successfully'));
});
