import {bot} from '../lib/bot.js';
import {addChat, isChatExists} from '../util/chat.js';

bot.defineUpdateHandler<'message'>('textMessage', (context): boolean => {
  if (context.message?.chat.id == null) return false;
  if (!isChatExists(context.message?.chat.id)) {
    addChat(context.message.chat);
  }
  return false;
}, 'high');
