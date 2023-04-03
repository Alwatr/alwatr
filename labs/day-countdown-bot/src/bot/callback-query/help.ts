import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';

bot.defineCallbackQueryHandler('help', async (context) => {
  logger.logMethod('callback-query-help');
  context.sendMessage(message('help_callback_query'));
  context.answerCallbackQuery();
});
