import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';

bot.action('help', async (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('action/help', {chatId});

  try {
    await sendMessage(chatId, message('action_help'));
  }
  catch (err) {
    logger.error('action/help', 'send_message_failed', {err});
  }

  ctx.answerCbQuery();
});
