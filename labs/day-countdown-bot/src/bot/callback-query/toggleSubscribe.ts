import {logger} from '../../config.js';
import {settingInlineKeyboard, subscribedSettingInlineKeyboard} from '../../content/buttons.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {toggleSubscribe} from '../../util/chat.js';

bot.defineCallbackQueryHandler('toggleSubscribe', async (context) => {
  logger.logMethodArgs?.('toggleSubscribe', {chatId: context.chatId});
  const isSubscribed = await toggleSubscribe(context.update.callback_query!.message!.chat.id);

  if (isSubscribed == null) {
    context.answerCallbackQuery({text: message('sign_in_first_message'), show_alert: true});
  }
  else if (isSubscribed === true) {
    context.answerCallbackQuery({text: message('subscribed_successfully_message')});
  }
  else {
    context.answerCallbackQuery({text: message('unsubscribed_successfully_message')});
  }

  await bot.api.editMessageReplyMarkup({
    chat_id: context.update.callback_query?.message?.chat.id,
    message_id: context.update.callback_query?.message?.message_id,
    reply_markup: {
      inline_keyboard: isSubscribed ? subscribedSettingInlineKeyboard : settingInlineKeyboard,
    },
  });
});
