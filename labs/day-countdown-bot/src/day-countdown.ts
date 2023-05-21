import {logger} from './config.js';
import {bot} from './lib/bot.js';
import {chatStorageClient, contentStorageClient} from './lib/storage.js';
import {dateDistance, ghadir} from './util/calender.js';
import {actionAllChat} from './util/chat.js';

export async function dayCountdown(): Promise<void> {
  const day = dateDistance(ghadir.valueOf());
  const content = await contentStorageClient.get(day + '', 'ghadir');
  if (content == null) {
    logger.accident('dayCountdown', 'content_is_null', 'Content is Null', day);
    return;
  }

  await actionAllChat(async (chatId) => {
    try {
      const chat = await chatStorageClient.get(chatId)!;
      if (!(chat?.isSubscribed === true)) return;

      await bot.api.copyMessage({
        chat_id: chatId,
        from_chat_id: content.chatId,
        message_id: content.messageId,
      });
    }
    catch {
      logger.accident('dayCountdown', 'copy_message_error', 'Copy Message Error', day, chatId);
    }
  });
}
