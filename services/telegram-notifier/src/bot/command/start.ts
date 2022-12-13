import {logger} from '../../config.js';
import {storage} from '../../lib/storage.js';
import {MemberList} from '../../lib/type.js';
import {bot} from '../bot.js';

bot.command('start', async (ctx): Promise<void> => {
  const chatId = ctx.chat.id;
  const token = ctx.message.text.split(' ')[1];
  logger.logMethodArgs('command/start', {chatId, token});

  if (token == null) {
    ctx.reply('این یک بات خصوصی هستش! لطفا مزاحم نشوید.');
    return;
  }

  const target: MemberList = storage.get(token, true) ?? {
    id: token,
    memberList: [],
  };

  if (target.memberList.indexOf(chatId) !== -1) {
    ctx.reply('شما درحال حاضر عضو این لیست هستید!');
    return;
  }

  target.memberList.push(chatId);
  storage.set(target, true);

  await ctx.reply('شما با موفقیت در لیست ثبت شدید.');
});
