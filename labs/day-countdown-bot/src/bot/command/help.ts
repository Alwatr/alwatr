import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';

bot.defineCommandHandler('help', (context, api) => {
  logger.logMethod('bot-command-help');
  api.sendMessage(context.message.chat.id, message('help_command'));
  // TODO: add chat to db
});
