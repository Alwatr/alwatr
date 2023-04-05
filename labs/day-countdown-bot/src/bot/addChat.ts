import {bot, botStorage} from '../lib/bot.js';
import {addChat} from '../util/chat.js';

bot.defineUpdateHandler<'message'>('textMessage', (context): boolean => {
  if (context.message?.chat.id == null) return false;
  if (!botStorage.has(context.message?.chat.id)) {
    addChat(context.message.chat);
  }
  return false;
}, 'high');
