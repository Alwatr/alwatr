import {logger} from '../../config.js';
import {NotStartInlineKeyboard, subscribedStartInlineKeyboard} from '../../content/buttons.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {isSubscribed} from '../../util/chat.js';

bot.defineCommandHandler('help', async (context) => {
  logger.logMethodArgs?.('command-help', {chatId: context.chatId});
  context.reply(message('help_message'), {
    reply_markup: {
      inline_keyboard: (await isSubscribed(context.chatId)) ? subscribedStartInlineKeyboard : NotStartInlineKeyboard,
    },
  });
});
