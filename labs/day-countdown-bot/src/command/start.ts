import {Context} from 'telegraf';

import {logger} from '../config.js';
import {bot} from '../lib/bot.js';
import {storageEngine} from '../lib/storage.js';

bot.command('start', commandStart);

function commandStart(ctx: Context): void {
  const chatId = ctx.chat?.id.toString();
  if (chatId == null) return;
  logger.logMethodArgs('command/start', {chatId});

  ctx.reply(`
    سلام ✌️
    من ربات روزشمار هستم!
`.replace('    ', ''));

  if (!storageEngine.has(chatId)) {
    storageEngine.set({id: chatId});
  }
}
