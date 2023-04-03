import {logger} from '../../config.js';
import {subscribedSettingInlineKeyboard} from '../../content/buttons.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';

bot.defineCommandHandler('setting', (context) => {
  logger.logMethod('command-setting');
  context.reply(message('setting_message'), {
    reply_markup: {
      inline_keyboard: subscribedSettingInlineKeyboard,
    },
  });
});
