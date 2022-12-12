import {logger} from '../../config.js';
import {bot} from '../bot.js';
import {storage} from '../../lib/storage.js';
import {MemberList} from '../../lib/type.js';

bot.command('start', async (ctx): Promise<void> => {
  const chatId = ctx.chat.id;
  const token = ctx.message.text.split(' ')[1];
  logger.logMethodArgs('command/start', {chatId, token});

  if (token == null) {
    ctx.reply('You don\'t have permission!');
    return;
  }

  const target: MemberList = storage.get(token, true) ?? {
    id: token,
    memberList: [],
  };

  target.memberList.push(chatId);
  storage.set(target, true);

  await ctx.reply('You are registered to notify list!');
});
