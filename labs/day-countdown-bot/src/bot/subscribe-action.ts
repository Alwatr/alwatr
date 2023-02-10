import {logger} from '../config.js';
import {sendDayCountDown} from '../dayCountdown.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {chatStorageEngine} from '../lib/storage.js';

bot.action('subscribe', async (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('action/subscribe', {chatId});

  if (!chatStorageEngine.has(chatId)) {
    chatStorageEngine.set({id: chatId});

    try {
      await sendMessage(chatId, message('action_subscribe_success'), {parse_mode: 'MarkdownV2'});
      await sendDayCountDown(chatId);
    }
    catch (err) {
      logger.error('command/subscribe', 'send_message_failed', {err});
      return;
    }
  }
  else {
    try {
      await sendMessage(chatId, message('action_subscribe_added_before'), {parse_mode: 'MarkdownV2'});
    }
    catch (err) {
      logger.error('command/subscribe', 'send_message_failed', {err});
      return;
    }
  }

  ctx.answerCbQuery();
});
