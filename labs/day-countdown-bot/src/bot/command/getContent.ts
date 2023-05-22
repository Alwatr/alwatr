import {UpdateType} from '@alwatr/telegram';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {contentStorageClient, conversationStorageClient} from '../../lib/storage.js';
import {isAdmin} from '../../util/admin.js';

import type {Conversation} from '../../type.js';

type GetContentConversationContext = Conversation & {
  name: 'get-content';
  state: 'getDay';
  context?: never;
};

async function getContentConversationHandler(update: UpdateType<'message'>): Promise<boolean> {
  const chatId = update.message!.chat.id.toString();
  const text = update.message!.text;
  const messageThreadId = update.message!.message_thread_id;
  const messageId = update.message!.message_id;

  if (!(await isAdmin(chatId, messageThreadId))) return false;

  const conversation = await conversationStorageClient.get<GetContentConversationContext>(chatId);
  if (conversation == null || conversation.name !== 'get-content') return false;

  if (text === '/reset') {
    await conversationStorageClient.delete(chatId);
    await bot.api.sendMessage(chatId, message('reset_message'), {
      reply_to_message_id: messageId,
      message_thread_id: messageThreadId,
    });
  }
  else if (conversation.state === 'getDay') {
    const day = text?.match(/\d+/)?.[0];
    if (day == null) {
      await bot.api.sendMessage(chatId, message('invalid_day_set_content_message'), {
        reply_to_message_id: messageId,
        message_thread_id: messageThreadId,
      });
      return true;
    }
    await conversationStorageClient.delete(chatId);

    const content = await contentStorageClient.get(day, 'ghadir');
    if (content == null) {
      await bot.api.sendMessage(chatId, message('not_found_content_message'), {
        reply_to_message_id: messageId,
        message_thread_id: messageThreadId,
      });
      return true;
    }

    await bot.api.copyMessage({
      chat_id: chatId,
      from_chat_id: content.chatId,
      message_id: content.messageId,
      message_thread_id: messageThreadId,
    });
  }
  else {
    // error
    logger.error('notifyConversationHandler', chatId, conversation);
    await conversationStorageClient.delete(chatId);
  }

  return true;
}

bot.defineCommandHandler('getContent', async (context) => {
  logger.logMethodArgs?.('getContent', {chatId: context.chatId});
  if (!(await isAdmin(context.chatId, context.messageThreadId))) return;

  await bot.api.sendMessage(context.chatId, message('send_get_content_message'), {
    reply_to_message_id: context.messageId,
    message_thread_id: context.messageThreadId,
  });

  await conversationStorageClient.set<GetContentConversationContext>({
    id: context.chatId + '',
    name: 'get-content',
    state: 'getDay',
  });
});

bot.defineUpdateHandler('textMessage', getContentConversationHandler);
