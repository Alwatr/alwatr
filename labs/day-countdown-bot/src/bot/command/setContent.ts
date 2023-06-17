import {isNumber} from '@alwatr/math';
import {UpdateType} from '@alwatr/telegram';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {contentStorageClient, conversationStorageClient} from '../../lib/storage.js';
import {isAdmin} from '../../util/admin.js';

import type {Conversation} from '../../type.js';

type SetContentConversationContext = Conversation & {
  name: 'set-content';
  state: 'getMessage' | 'getDay';
  context?: {
    contentMessageId?: number;
  }
};

async function setContentConversationHandler(update: UpdateType<'message'>): Promise<boolean> {
  const chatId = update.message?.chat.id ? update.message?.chat.id + '' : null;
  const text = update.message?.text;
  const messageId = update.message?.message_id;
  const messageThreadId = update.message?.message_thread_id;

  logger.logMethodArgs?.('setContentConversationHandler', {chatId, messageId, messageThreadId});

  if (chatId == null || !isAdmin(chatId)) return false;

  const conversation = await conversationStorageClient.get<SetContentConversationContext>(chatId);
  if (conversation == null || conversation.name !== 'set-content') return false;

  if (text === '/cancel') {
    await conversationStorageClient.delete(chatId);
    await bot.api.sendMessage(chatId, message('cancel_message'), {
      message_thread_id: messageThreadId,
      reply_to_message_id: messageId,
    });
  }
  else if (conversation.state === 'getMessage') {
    await conversationStorageClient.set<SetContentConversationContext>({
      ...conversation,
      context: {
        contentMessageId: messageId,
      },
      state: 'getDay',
    });
    await bot.api.sendMessage(chatId, message('set_day_set_content_message'), {
      reply_to_message_id: messageId,
      message_thread_id: messageThreadId,
    });
  }
  else if (conversation.state === 'getDay') {
    const day = text?.match(/\d+/)?.[0];
    if (day == null || !isNumber(day)) {
      await bot.api.sendMessage(chatId, message('invalid_day_set_content_message'), {
        reply_to_message_id: messageId,
        message_thread_id: messageThreadId,
      });
      return true;
    }
    await bot.api.sendMessage(chatId, message('ok_set_content_message'), {
      reply_to_message_id: messageId,
      message_thread_id: messageThreadId,
    });
    await conversationStorageClient.delete(chatId);
    await contentStorageClient.set({
      id: day,
      chatId: +chatId,
      messageId: +conversation.context!.contentMessageId!,
    }, 'mobaheleh');
  }

  return true;
}

bot.defineCommandHandler('setContent', async (context) => {
  logger.logMethodArgs?.('setContent', context.chatId);
  if (!isAdmin(context.chatId)) return;

  await bot.api.sendMessage(context.chatId, message('send_set_content_message'), {
    reply_to_message_id: context.messageId,
  });

  await conversationStorageClient.set<SetContentConversationContext>({
    id: context.chatId + '',
    name: 'set-content',
    state: 'getMessage',
  });
});

bot.defineUpdateHandler('textMessage', setContentConversationHandler);
