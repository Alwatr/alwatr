import {UpdateType} from '@alwatr/telegram';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {conversationStorageClient} from '../../lib/storage.js';
import {isAdmin} from '../../util/admin.js';
import {actionAllChat, deleteChat} from '../../util/chat.js';

import type {Conversation} from '../../type.js';

type NotifyConversationContext = Conversation & {
  name: 'notify';
  state: 'getMessage' | 'notify';
  context?: {
    notifyMessageId?: number;
  };
};

async function notifyConversationHandler(update: UpdateType<'message'>): Promise<boolean> {
  const chatId = update.message?.chat.id ? update.message?.chat.id + '' : null;
  const text = update.message?.text;
  const messageId = update.message?.message_id;
  const messageThreadId = update.message?.message_thread_id ? +update.message.message_thread_id : undefined;

  if (chatId == null || !isAdmin(chatId)) return false;

  const conversation = await conversationStorageClient.get<NotifyConversationContext>(chatId);
  if (conversation == null || conversation.name !== 'notify') return false;

  if (text === '/cancel') {
    await conversationStorageClient.delete(chatId);
    await bot.api.sendMessage(chatId, message('cancel_message'), {
      message_thread_id: messageThreadId,
      reply_to_message_id: messageId,
    });
  }
  else if (conversation.state === 'getMessage') {
    await bot.api.sendMessage(chatId, message('approval_notify_message'), {
      message_thread_id: messageThreadId,
      reply_to_message_id: messageId,
    });
    await conversationStorageClient.set<NotifyConversationContext>({
      ...conversation,
      context: {
        notifyMessageId: messageId,
      },
      state: 'notify',
    });
  }
  else if (conversation.state === 'notify') {
    // notify
    if (text === 'yes') {
      await conversationStorageClient.delete(chatId);
      const notifyMessageId = conversation.context!.notifyMessageId!;
      let i = 0;

      await actionAllChat(async (chat) => {
        const response = await bot.api.copyMessage({
          chat_id: chat.id,
          from_chat_id: chatId,
          message_id: notifyMessageId,
          message_thread_id: chat.chatDetail?.messageThreadId as number | undefined,
        });

        if (response?.ok === true) i++;
        else if (response?.error_code === 403) {
          await deleteChat(chat.id);
        }
      });

      await bot.api.sendMessage(chatId, message('notified_successfully_message').replace('${userCount}', i + ''), {
        reply_to_message_id: messageId,
        message_thread_id: messageThreadId,
      });
    }
  }

  return true;
}

bot.defineCommandHandler('notify', async (context) => {
  logger.logMethodArgs?.('notify', context);
  if (!isAdmin(context.chatId)) return;

  await bot.api.sendMessage(context.chatId, message('send_notify_message'), {
    message_thread_id: context.messageThreadId,
    reply_to_message_id: context.messageId,
  });

  await conversationStorageClient.set<NotifyConversationContext>({
    name: 'notify',
    id: context.chatId + '',
    state: 'getMessage',
  });
});

bot.defineUpdateHandler('textMessage', notifyConversationHandler);
