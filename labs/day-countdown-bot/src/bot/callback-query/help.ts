import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';

bot.defineCallbackQueryHandler('help', async (context) => {
  logger.logMethodArgs?.('callback-query-help', {chatId: context.chatId});
  await bot.api.sendMessage(context.update.callback_query!.message!.chat.id, message('help_message'), {
    reply_to_message_id: context.update.callback_query!.message!.message_id,
    message_thread_id: context.update.callback_query!.message!.message_thread_id,
  });
  await context.answerCallbackQuery();
});
