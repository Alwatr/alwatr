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
  ** اَلسَّلاَمُ عَلَيْكَ حِينَ تُصْبِحُ وَ تُمْسِي✨ **

  همسفرِ نادیده و ناشناس ☺   ️
  خوش حالیم که در این م سیر، با ما همراه شدی 🥰

  قراره پا به پای هم، صفحه های ابریِ زندگی رو یکی یکی ورق بزنیم و برسیم:

  به پر نور ترین روزِ امسال
  به قشنگ ترین روزِ هرسال  ✨
`.replaceAll('  ', ''), {parse_mode: 'MarkdownV2'});

  if (!storageEngine.has(chatId)) {
    storageEngine.set({id: chatId});
  }
}
