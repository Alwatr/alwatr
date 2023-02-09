import {logger} from '../config.js';
import {sendDayCountDown} from '../dayCountdown.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {storageEngine} from '../lib/storage.js';

bot.action('subscribe', (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('action/subscribe', {chatId});

  if (!storageEngine.has(chatId)) {
    storageEngine.set({id: chatId});
    sendMessage(chatId, message('action_subscribe_success'), {parse_mode: 'MarkdownV2'});
    sendDayCountDown(chatId);
  }
  else {
    sendMessage(chatId, message('action_subscribe_added_before'), {parse_mode: 'MarkdownV2'});
  }

  ctx.answerCbQuery();
});
