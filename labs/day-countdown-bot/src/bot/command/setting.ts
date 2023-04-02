import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';

bot.defineCommandHandler('setting', (context) => {
  logger.logMethod('command-setting');
  context.reply(message('start_setting'));
});
