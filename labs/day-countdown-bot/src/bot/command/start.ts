import {logger} from '../../config.js';
import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {chatStorageEngine} from '../../lib/storage.js';

bot.defineCommandHandler('start', (context, api) => {
  logger.logMethod('bot-command-start');
  api.sendMessage(context.message.chat.id, message('start_command'));
  chatStorageEngine.set({
    chatDetail: context.message.chat,
  });
});
