import {isNumber} from '@alwatr/math';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {contentStorageClient} from '../../lib/storage.js';
import {isAdmin} from '../../util/admin.js';

bot.defineCommandHandler('getContent', async (context) => {
  logger.logMethodArgs?.('command-getContent', {chatId: context.chatId});
  if (!isAdmin(context.chatId)) return;

  const day = context.commandParams ? context.commandParams[0] : null;

  if (day == null || !isNumber(day)) {
    await bot.api.sendMessage(context.chatId, message('content_command_param_error'), {
      message_thread_id: context.messageThreadId,
    });
    return;
  }

  return sendContent(day, context.chatId, context.messageThreadId);
});

export async function sendContent(day: string | number, chatId: number, chatThreadId?: number): Promise<void> {
  logger.logMethodArgs?.('sendContent', {day, chatId, chatThreadId});
  const content = await contentStorageClient.get(day + '', 'mobaheleh');
  if (content == null) {
    await bot.api.sendMessage(chatId, message('get_content_null').replace('${day}', day + ''), {
      message_thread_id: chatThreadId,
    });
    return;
  }

  // else
  const response = await bot.api.copyMessage({
    chat_id: chatId,
    from_chat_id: content.chatId,
    message_id: content.messageId,
    message_thread_id: chatThreadId,
  });

  if (response?.ok !== true) {
    if (response?.error_code === 400) {
      await bot.api.sendMessage(chatId, message('send_content_message_not_exists').replace('${day}', day + ''), {
        message_thread_id: chatThreadId,
      });
    }
    return;
  }

  await bot.api.sendMessage(chatId, message('send_next_day_countdown_day').replace('${day}', day + ''), {
    reply_to_message_id: response.result.message_id,
    allow_sending_without_reply: true,
    message_thread_id: chatThreadId,
  });
}
