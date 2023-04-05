import {logger} from '../../config.js';
import {settingInlineKeyboard, subscribedSettingInlineKeyboard} from '../../content/buttons.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {isSubscribed} from '../../util/chat.js';

bot.defineCommandHandler('setting', async (context) => {
  logger.logMethod('command-setting');
  context.reply(message('setting_message'), {
    reply_markup: {
      inline_keyboard: await isSubscribed(context.chatId) ? subscribedSettingInlineKeyboard : settingInlineKeyboard,
    },
  });
});
