import {UpdateType} from '@alwatr/telegram';
import {AlwatrDocumentObject} from '@alwatr/type';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {contentStorageClient, conversationStorageClient} from '../../lib/storage.js';
import {isAdmin} from '../../util/admin.js';

interface SetContentConversationContext extends AlwatrDocumentObject {
  contentMessageId?: number;
  state: 'initial' | 'getMessage' | 'getDay';
}

const conversationName = 'content';

async function setContentConversationHandler(update: UpdateType<'message'>): Promise<boolean> {
  const chatId = update.message!.chat.id.toString();
  const text = update.message!.text;
  const messageId = update.message!.message_id;
  let conversation;

  try {
    // TODO: fix with new v2 storage
    conversation = await conversationStorageClient.get<SetContentConversationContext>(chatId, conversationName);
  }
  catch {
    return false;
  }

  if (text === '/reset') {
    conversationStorageClient.delete(chatId, conversationName);
    await bot.api.sendMessage(chatId, 'reset_message');
  }
  else if (conversation.state === 'getMessage') {
    bot.api.sendMessage(chatId, message('set_day_set_content_message'));
    await conversationStorageClient.set<SetContentConversationContext>({
      id: chatId,
      contentMessageId: messageId,
      state: 'getDay',
    }, conversationName);
  }
  else if (conversation.state === 'getDay') {
    const day = text?.match(/\d+/)?.[0];
    if (day == null) {
      await bot.api.sendMessage(chatId, message('invalid_day_set_content_message'));
      return true;
    }
    await bot.api.sendMessage(chatId, message('ok_set_content_message'));
    await conversationStorageClient.delete(chatId, conversationName);
    await contentStorageClient.set({
      id: day,
      chatId,
      messageId: conversation.contentMessageId,
    }, 'ghadir');
  }
  else {
    // error
    logger.error('notifyConversationHandler', conversationName, chatId, conversation);
  }

  return true;
}

bot.defineCommandHandler('setContent', async (context) => {
  logger.logMethodArgs?.('setContent', context);
  if (!isAdmin(context.chatId)) return;
  bot.api.sendMessage(context.chatId, message('send_set_content_message'), {reply_to_message_id: context.messageId!});

  await conversationStorageClient.set<SetContentConversationContext>({
    id: context.chatId + '',
    state: 'getMessage',
  }, conversationName);
});

bot.defineUpdateHandler('textMessage', setContentConversationHandler);
