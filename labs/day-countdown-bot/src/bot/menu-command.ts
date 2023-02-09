import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {bot} from '../lib/bot.js';
import {sendMessage} from '../lib/send-message.js';

bot.command('menu', (ctx) => {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/menu', {chatId});

  sendMessage(chatId, message('command_menu'), {
    parse_mode: 'MarkdownV2',
    reply_to_message_id: ctx.message.message_id,
    allow_sending_without_reply: true,

    reply_markup: {inline_keyboard: [[{
      text: message('button_help'), callback_data: 'help',
    }], [
      {
        text: message('button_unsubscribe'), callback_data: 'unsubscribe',
      }],
    ]},
  });
});
