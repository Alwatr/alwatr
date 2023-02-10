import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {chatStorageEngine} from '../lib/storage.js';
import {deleteUser} from '../user.js';

bot.action('unsubscribe', async (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('action/unsubscribe', {chatId});

  if (chatStorageEngine.has(chatId)) {
    deleteUser(chatId);
    try {
      await sendMessage(chatId, message('action_unsubscribe_success'), {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: [[
            {text: message('button_subscribe'), callback_data: 'subscribe'},
          ]],
        },
      });
    }
    catch (err) {
      logger.error('command/unsubscribe', 'send_message_failed', {err});
      return;
    }
  }
  else {
    try {
      await sendMessage(chatId, message('action_unsubscribe_failed'), {
        parse_mode: 'MarkdownV2',
        reply_markup: {
          inline_keyboard: [[
            {text: message('button_subscribe'), callback_data: 'subscribe'},
          ]],
        },
      });
    }
    catch (err) {
      logger.error('command/unsubscribe', 'send_message_failed', {err});
      return;
    }
  }

  ctx.answerCbQuery();
});
