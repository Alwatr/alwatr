import {message} from '../../director/l18e-loader.js';
import {bot} from '../../lib/bot.js';
import {addChat} from '../../util/chat.js';

bot.defineCommandHandler('signin', (context) => {
  if (context.update.message?.chat == null) return;
  addChat(context.update.message?.chat);
  context.reply(message('sign_in_successfully'));
});
