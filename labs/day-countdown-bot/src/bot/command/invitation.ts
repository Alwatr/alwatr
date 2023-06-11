import {logger} from '../../config.js';
import {NotStartInlineKeyboard, subscribedStartInlineKeyboard} from '../../content/buttons.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {isAdmin} from '../../util/admin.js';
import {actionAllChat, isSubscribed} from '../../util/chat.js';

bot.defineCommandHandler('invitation', async (context) => {
  logger.logMethod?.('command-invitation');
  if (!isAdmin(context.chatId)) return;

  let i = 0;
  await actionAllChat(async (chat) => {
    await bot.api.sendMessage(chat.id, message('invitation_message'), {
      reply_markup: {
        inline_keyboard: await isSubscribed(context.chatId) ? subscribedStartInlineKeyboard : NotStartInlineKeyboard,
      },
      message_thread_id: chat.chatDetail?.messageThreadId as number | undefined,
    });
    i++;
  });

  await context.reply(message('invitation_message_sent').replace('${count}', i + ''));
});
