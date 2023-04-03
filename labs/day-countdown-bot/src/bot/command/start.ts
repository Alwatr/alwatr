import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';

bot.defineCommandHandler('start', (context) => {
  logger.logMethod('command-start');
  context.reply(message('start_message'));
});
