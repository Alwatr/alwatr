import {logger} from '../../config.js';
import {storage} from '../../lib/storage.js';
import {MemberList} from '../../lib/type.js';
import {bot} from '../bot.js';

bot.defineCommandHandler('start', async (context, api): Promise<void> => {
  const chatId = context.message.chat.id;
  const token = context.message.text.split(' ')[1];
  logger.logMethodArgs?.('command/start', {chatId, token});

  if (token == null) {
    api.sendMessage(chatId, 'این یک بات خصوصی هستش! لطفا مزاحم نشوید.');
    return;
  }

  const target: MemberList = storage.get(token, true) ?? {
    id: token,
    memberList: [],
  };

  if (target.memberList.indexOf(chatId) !== -1) {
    api.sendMessage(chatId, 'شما درحال حاضر عضو این لیست هستید!');
    return;
  }

  target.memberList.push(chatId);
  storage.set(target, true);

  api.sendMessage(chatId, 'شما با موفقیت در لیست ثبت شدید.');
});
