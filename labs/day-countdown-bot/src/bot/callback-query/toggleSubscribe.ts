import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {toggleSubscribe} from '../../util/chat.js';

bot.defineCallbackQueryHandler('toggleSubscribe', (context) => {
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
});
