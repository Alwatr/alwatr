import {bot} from '../../lib/bot.js';
import {logger} from '../../lib/config.js';

bot.command('start', async (ctx): Promise<void> => {
  const chatId = ctx.chat.id;
  logger.logMethodArgs('command/start', {chatId});
  const target = storage.get('all', true) ?? {memberList: []};
  target.memberList.push(chatId);
  storage.set(target, true);
  await ctx.reply('You are registered to notify list!');
});
