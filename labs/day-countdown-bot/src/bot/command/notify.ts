import {AlwatrTelegramConversation} from '@alwatr/telegram';

import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot, botStorage} from '../../lib/bot.js';
import {isAdmin} from '../../util/admin.js';
import {actionAllChat} from '../../util/chat.js';

const notifyConversation = new AlwatrTelegramConversation(
    {
      stateRecord: {
        initial: (context, conversationConfig): void => {
          logger.logMethodArgs(notifyConversation.config.id + '-initial', {conversationConfig});
          context.reply(message('send_notify_message'));
          notifyConversation.setState(context.chatId, 'getMessage');
        },
        reset: (context, conversationConfig): void => {
          logger.logMethodArgs(notifyConversation.config.id + '-reset', {conversationConfig});
          context.reply(message('reset_notify_message'));
          notifyConversation.reset(context.chatId);
        },
        getMessage: async (context, conversationConfig): Promise<void> => {
          logger.logMethodArgs(notifyConversation.config.id + '-getMessage', {conversationConfig});
          context.reply(message('approval_notify_message'));
          await notifyConversation.setContext(context.chatId, {messageId: context.messageId});
          await notifyConversation.setState(context.chatId, 'notify');
        },
        notify: async (context, conversationConfig): Promise<void> => {
          logger.logMethodArgs(notifyConversation.config.id + '-notify', {conversationConfig});
          if (context.update.message?.text != 'yes') {
            await notifyConversation.setState(context.chatId, 'getMessage');
            return;
          }
          let i = 0;
          await actionAllChat(async (chatId) => {
            const messageId = conversationConfig.context.messageId as number;
            bot.api.copyMessage({chat_id: chatId, from_chat_id: context.chatId, message_id: messageId});
            i += 1;
          });
          context.reply(message('notified_successfully_message').replace('${userCount}', i + ''));
          await notifyConversation.reset(context.chatId);
        },
      },
      resetOption: {
        TextMessageValue: '/reset',
      },
    },
    botStorage,
    bot.api,
    {
      id: 'notify',
      currentState: 'initial',
      context: {},
    },
);

// initial
bot.defineCommandHandler('notify', async (context) => {
  if (!context.requireAccess(isAdmin)) return;
  const config = await notifyConversation.getConfig(context.chatId);
  if (config == null) {
    context.reply('sign_in_first');
    return;
  }

  notifyConversation.option.stateRecord.initial(context, config);
});

bot.defineUpdateHandler('all', notifyConversation.updateHandler.bind(notifyConversation), 'high');
