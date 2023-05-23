import {UpdateType} from '@alwatr/telegram';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {conversationStorageClient} from '../../lib/storage.js';
import {isAdmin} from '../../util/admin.js';
import {actionAllChat} from '../../util/chat.js';

import type {Conversation} from '../../type.js';

type NotifyConversationContext = Conversation & {
  name: 'notify';
  state: 'getMessage' | 'notify';
  context?: {
    notifyMessageId?: number;
  };
};

async function notifyConversationHandler(update: UpdateType<'message'>): Promise<boolean> {
  const chatId = update.message!.chat.id.toString();
  const text = update.message!.text;
  const messageId = update.message!.message_id;
  const messageThreadId = update.message!.message_thread_id ? +update.message!.message_thread_id! : undefined;

  if (!isAdmin(chatId)) return false;

  const conversation = await conversationStorageClient.get<NotifyConversationContext>(chatId);
  if (conversation == null || conversation.name !== 'notify') return false;

  if (text === '/reset') {
    await conversationStorageClient.delete(chatId);
    await bot.api.sendMessage(chatId, message('reset_notify_message'), {
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
        await bot.api.copyMessage({chat_id: chat.id, from_chat_id: chatId, message_id: notifyMessageId});
        i++;
      });

      await bot.api.sendMessage(chatId, message('notified_successfully_message').replace('${userCount}', i + ''), {
        reply_to_message_id: messageId,
        message_thread_id: messageThreadId,
      });
    }
    else {
      await bot.api.sendMessage(chatId, message('cancel_notify_message'), {
        message_thread_id: messageThreadId,
        reply_to_message_id: messageId,
      });
    }
  }
  else {
    // error
    logger.error('notifyConversationHandler', chatId, conversation);
    await conversationStorageClient.delete(chatId);
  }

  return true;
}

bot.defineCommandHandler('notify', async (context) => {
  logger.logMethodArgs?.('notify', context);
  if (!isAdmin(context.chatId)) return;

  const messageId = context.messageId;
  const messageThreadId = context.messageThreadId;

  await bot.api.sendMessage(context.chatId, message('send_notify_message'), {
    message_thread_id: messageThreadId,
    reply_to_message_id: messageId,
  });

  await conversationStorageClient.set<NotifyConversationContext>({
    name: 'notify',
    id: context.chatId + '',
    state: 'getMessage',
  });
});

bot.defineUpdateHandler('textMessage', notifyConversationHandler);
