import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';
import {storageEngine} from '../lib/storage.js';

bot.action('unsubscribe', (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('action/unsubscribe', {chatId});

  if (storageEngine.has(chatId)) {
    storageEngine.delete(chatId);
    sendMessage(chatId, message('action_unsubscribe_success'), {parse_mode: 'MarkdownV2'});
  }
  else {
    sendMessage(chatId, message('action_unsubscribe_failed'), {parse_mode: 'MarkdownV2'});
  }

  ctx.answerCbQuery();
});
