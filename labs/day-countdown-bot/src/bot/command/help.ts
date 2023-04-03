import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';

bot.defineCommandHandler('help', (context) => {
  logger.logMethod('command-help');
  context.reply(message('help_message'));
});
