import {AlwatrConversationConfig, AlwatrTelegramConversation} from '@alwatr/telegram';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {chatStorageEngine} from '../../lib/storage.js';
import {isAdmin} from '../../util/admin.js';

const notifyConversation = new AlwatrTelegramConversation(
    {
      stateRecord: {
        initial: (context, conversationConfig): void => {
          logger.logMethodArgs(notifyConversation.config.id + '-initial', {conversationConfig});
          context.reply(message('send_notify_message'));
          notifyConversation.setState(context.chatId, conversationConfig, 'getMessage');
        },
        reset: (context, conversationConfig): void => {
          logger.logMethodArgs(notifyConversation.config.id + '-reset', {conversationConfig});
          context.reply(message('reset_notify_message'));
          notifyConversation.reset(context.chatId);
        },
        getMessage: (context, conversationConfig): void => {
          context.reply(message('approval_notify_message')); // reply markup
          notifyConversation.setState(context.chatId, conversationConfig, 'notify');
        },
        notify: (context): void => {
          // TODO: notify
          notifyConversation.reset(context.chatId);
        },
      },
      resetOption: {
        TextMessageValue: '/reset',
      },
    },
    {
      get: getStorageHandler,
      reset: resetStorageHandler,
      set: setStorageHandler,
    },
    bot.api,
    {
      id: 'notify',
      currentState: 'initial',
      context: {},
    },
);

function getStorageHandler(chatId: string): AlwatrConversationConfig | null {
  const chat = chatStorageEngine.get(chatId);
  if (chat == null) return null;
  chat.conversationRecord ??= {};
  return chat.conversationRecord[notifyConversation.config.id];
}
function resetStorageHandler(chatId: string): void {
  const chat = chatStorageEngine.get(chatId);
  if (chat == null || chat.conversationRecord == null) return;
  delete chat.conversationRecord[notifyConversation.config.id];
  chatStorageEngine.set(chat);
}
function setStorageHandler(chatId: string, config: AlwatrConversationConfig): void {
  const chat = chatStorageEngine.get(chatId);
  if (chat == null) return;
  chatStorageEngine.set({
    ...chat,
    conversationRecord: {
      [notifyConversation.config.id]: config,
    },
  });
}

// initial
bot.defineCommandHandler('notify', (context) => {
  if (!context.requireAccess(isAdmin)) return;
  const config = notifyConversation.getConfig(context.chatId);
  notifyConversation.option.stateRecord.initial(context, config);
});

bot.defineUpdateHandler<'message'>('textMessage', notifyConversation.updateHandler.bind(notifyConversation), 'high');
