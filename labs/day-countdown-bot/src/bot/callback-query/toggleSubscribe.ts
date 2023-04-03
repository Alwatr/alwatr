import {settingInlineKeyboard, subscribedSettingInlineKeyboard} from '../../content/buttons.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {toggleSubscribe} from '../../util/chat.js';

bot.defineCallbackQueryHandler('toggleSubscribe', async (context) => {
  const isSubscribed = toggleSubscribe(context.chatId);

  if (isSubscribed == null) {
    context.answerCallbackQuery({text: message('sign_in_first_message'), show_alert: true});
  }
  else if (isSubscribed === true) {
    context.answerCallbackQuery({text: message('subscribed_successfully_message')});
  }
  else {
    context.answerCallbackQuery({text: message('unsubscribed_successfully_message')});
  }

  await context.editMessageReplyMarkup({
    reply_markup: {
      inline_keyboard: isSubscribed ? subscribedSettingInlineKeyboard : settingInlineKeyboard,
    },
  });
});
