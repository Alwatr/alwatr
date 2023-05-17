import {bot} from '../lib/bot.js';
import {chatStorageClient} from '../lib/storage.js';
import {addChat} from '../util/chat.js';

bot.defineUpdateHandler<'message'>('textMessage', async (context): Promise<boolean> => {
  if (context.message?.chat.id == null) return false;
  if (!await chatStorageClient.has(context.message?.chat.id + '')) {
    addChat(context.message.chat);
  }
  return false;
}, 'high');
