import {logger} from '../../config.js';
import {storage} from '../../lib/storage.js';
import {MemberList} from '../../lib/type.js';
import {bot} from '../bot.js';

bot.defineCommandHandler('start', async (context): Promise<void> => {
  const chatId = context.update.message?.chat.id;
  const token = context.update.message?.text?.split(' ')[1];
  logger.logMethodArgs?.('command/start', {chatId, token});
  if (chatId == null) return;

  if (token == null) {
    context.reply('این یک بات خصوصی هستش! لطفا مزاحم نشوید.');
    return;
  }

  const target: MemberList = storage.get(token, true) ?? {
    id: token,
    memberList: [],
  };

  if (target.memberList.indexOf(chatId) !== -1) {
    context.reply('شما درحال حاضر عضو این لیست هستید!');
    return;
  }

  target.memberList.push(chatId);
  storage.set(target, true);

  context.reply('شما با موفقیت در لیست ثبت شدید.');
});
