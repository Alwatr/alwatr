import {logger} from '../../config.js';
import {NotStartInlineKeyboard, subscribedStartInlineKeyboard} from '../../content/buttons.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {addChat, toggleSubscribe} from '../../util/chat.js';

bot.defineCallbackQueryHandler('toggleSubscribe', async (context) => {
  logger.logMethodArgs?.('command-toggleSubscribe', {chatId: context.chatId});

  // TODO: check permission for user
  let isSubscribed = await toggleSubscribe(context.chatId);

  if (isSubscribed == null) {
    logger.error('command-toggleSubscribe', 'chat_not_found');
    await addChat(
      context.update.callback_query!.message!.chat,
      context.update.callback_query!.message!.message_thread_id,
    );
    isSubscribed = await toggleSubscribe(context.chatId);
  }

  if (isSubscribed === true) {
    context.answerCallbackQuery({text: message('subscribed_successfully_message')});
  }
  else {
    context.answerCallbackQuery({text: message('unsubscribed_successfully_message')});
  }

  await bot.api.editMessageReplyMarkup({
    chat_id: context.chatId,
    message_id: context.messageId,
    reply_markup: {
      inline_keyboard: isSubscribed ? subscribedStartInlineKeyboard : NotStartInlineKeyboard,
    },
  });

  // TODO: remove reply markup when subscribed
});
