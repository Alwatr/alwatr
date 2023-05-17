import {UpdateType} from '@alwatr/telegram';
import {AlwatrDocumentObject} from '@alwatr/type';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {conversationStorageClient} from '../../lib/storage.js';
import {actionAllChat} from '../../util/chat.js';

// const notifyConversation = new AlwatrTelegramConversation(
//     {
//       stateRecord: {
//         initial: (context, conversationConfig): void => {
//           logger.logMethodArgs?.(notifyConversation.config.id + '-initial', {conversationConfig});
//           context.reply(message('send_notify_message'));
//           notifyConversation.setState(context.chatId, 'getMessage');
//         },
//         reset: (context, conversationConfig): void => {
//           logger.logMethodArgs?.(notifyConversation.config.id + '-reset', {conversationConfig});
//           context.reply(message('reset_notify_message'));
//           notifyConversation.reset(context.chatId);
//         },
//         getMessage: async (context, conversationConfig): Promise<void> => {
//           logger.logMethodArgs?.(notifyConversation.config.id + '-getMessage', {conversationConfig});
//           context.reply(message('approval_notify_message'));
//           await notifyConversation.setContext(context.chatId, {messageId: context.messageId});
//           await notifyConversation.setState(context.chatId, 'notify');
//         },
//         notify: async (context, conversationConfig): Promise<void> => {
//           logger.logMethodArgs?.(notifyConversation.config.id + '-notify', {conversationConfig});
//           if (context.update.message?.text != 'yes') {
//             await notifyConversation.setState(context.chatId, 'getMessage');
//             return;
//           }
//           let i = 0;
//           await actionAllChat(async (chatId) => {
//             const messageId = conversationConfig.context.messageId as number;
//             bot.api.copyMessage({chat_id: chatId, from_chat_id: context.chatId, message_id: messageId});
//             i += 1;
//           });
//           context.reply(message('notified_successfully_message').replace('${userCount}', i + ''));
//           await notifyConversation.reset(context.chatId);
//         },
//       },
//       resetOption: {
//         TextMessageValue: '/reset',
//       },
//     },
//     botStorage,
//     bot.api,
//     {
//       id: 'notify',
//       currentState: 'initial',
//       context: {},
//     },
// );

interface NotifyConversationContext extends AlwatrDocumentObject {
  notifyMessageId?: number;
  state: 'initial' | 'getMessage' | 'notify';
}

const conversationName = 'notify';

async function notifyConversationHandler(update: UpdateType<'message'>): Promise<boolean> {
  const chatId = update.message!.chat.id.toString();
  const text = update.message!.text;
  const messageId = update.message!.message_id;

  if (text === '/notify') {
    // initial
    bot.api.sendMessage(chatId, message('send_notify_message'), {reply_to_message_id: messageId});
    conversationStorageClient.set<NotifyConversationContext>({
      id: chatId,
      state: 'getMessage',
    }, conversationName);
    return true;
  }
  let conversation;

  try {
    conversation = await conversationStorageClient.get<NotifyConversationContext>(chatId, conversationName);
  }
  catch {
    return false;
  }

  if (text === '/reset') {
    conversationStorageClient.delete(chatId, conversationName);
    await bot.api.sendMessage(chatId, 'reset_notify_message');
  }
  else if (conversation.state === 'getMessage') {
    bot.api.sendMessage(chatId, message('approval_notify_message'));
    await conversationStorageClient.set<NotifyConversationContext>({
      id: chatId,
      notifyMessageId: messageId,
      state: 'notify',
    }, conversationName);
  }
  else if (conversation.state === 'notify') {
    // notify
    if (text === 'yes') {
      const notifyMessageId = conversation.notifyMessageId!;
      let i = 0;

      actionAllChat(async (chatId) => {
        await bot.api.copyMessage({chat_id: chatId, from_chat_id: chatId, message_id: notifyMessageId});
        i++;
      });

      await bot.api.sendMessage(chatId, message('notified_successfully_message').replace('${userCount}', i + ''), {
        reply_to_message_id: messageId,
      });
      conversationStorageClient.delete(chatId, conversationName);
    }
    else {
      await bot.api.sendMessage(chatId, message('approval_notify_message'));
    }
  }
  else {
    // error
    logger.error('notifyConversationHandler', conversationName, chatId, conversation);
  }

  return true;
}

bot.defineUpdateHandler('textMessage', notifyConversationHandler);
