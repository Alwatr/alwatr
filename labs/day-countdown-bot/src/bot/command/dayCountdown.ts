import {sendContent} from './getContent.js';
import {sendDayCountdownContent} from '../../day-countdown.js';
import {bot} from '../../lib/bot.js';
import {adminInfoList, isAdmin} from '../../util/admin.js';
import {dateDistance, mobaheleh} from '../../util/calender.js';

bot.defineCommandHandler('dayCountdown', async (context) => {
  if (!isAdmin(context.chatId)) return;
  const param = context.commandParams ? context.commandParams[0] : 'no';
  if (param !== 'yes') return;

  let day = dateDistance(mobaheleh.valueOf());
  if (day < 0) return; // TODO: notify to admin for remove it.

  await sendDayCountdownContent(day);
  for (let i = adminInfoList.length - 1; 0 <= i; i--) {
    await sendContent(--day, adminInfoList[i].chatId, adminInfoList[i].messageThreadId);
  }
});
