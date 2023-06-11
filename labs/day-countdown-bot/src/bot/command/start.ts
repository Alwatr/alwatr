import {logger} from '../../config.js';
import {NotStartInlineKeyboard, subscribedStartInlineKeyboard} from '../../content/buttons.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {addChat, isSubscribed} from '../../util/chat.js';

bot.defineCommandHandler('start', async (context) => {
  logger.logMethodArgs?.('command-start', {chatId: context.chatId});
  await addChat(context.update.message!.chat, context.messageThreadId);

  context.reply(message('start_message'), {
    reply_markup: {
      inline_keyboard: (await isSubscribed(context.chatId)) ? subscribedStartInlineKeyboard : NotStartInlineKeyboard,
    },
  });
});
