
import {sendContent} from './bot/command/getContent.js';
import {config, logger} from './config.js';
import {message} from './director/l18e-loader.js';
import {bot} from './lib/bot.js';
import {contentStorageClient} from './lib/storage.js';
import {adminInfoList} from './util/admin.js';
import {dateDistance, mobaheleh} from './util/calender.js';
import {actionAllChat, checkDayCountdownSent, deleteChat, setDayCountdownSent} from './util/chat.js';

import type {MaybePromise} from '@alwatr/type';

export async function sendDayCountdownContent(day: number): Promise<void> {
  logger.logMethodArgs?.('sendDayCountdownContent', {day});
  const content = await contentStorageClient.get(day + '', 'mobaheleh');
  if (content == null) {
    logger.accident('dayCountdown', 'content_is_null', 'Content is Null', day);
    for (let i = adminInfoList.length - 1; 0 <= i; i--) {
      await bot.api.sendMessage(adminInfoList[i].chatId,
          message('send_get_content_null_message').replace('${day}', day + '',
          ), {
            message_thread_id: adminInfoList[i].messageThreadId,
          });
    }

    return;
  }

  let userCount = 0;
  await actionAllChat(async (chat) => {
    try {
      if (chat?.isSubscribed !== true || await checkDayCountdownSent(day, chat.id)) return;

      const response = await bot.api.copyMessage({
        chat_id: chat.id,
        from_chat_id: content.chatId,
        message_id: content.messageId,
        message_thread_id: chat.chatDetail!.messageThreadId as number | undefined,
      });

      await setDayCountdownSent(day, chat.id);

      if (response?.ok === true) userCount++;
      else if (response?.error_code === 403) {
        await deleteChat(chat.id);
      }
    }
    catch {
      logger.accident('dayCountdown', 'copy_message_error', 'Copy Message Error', day, chat.id);
    }
  });

  for (let i = adminInfoList.length - 1; 0 <= i; i--) {
    await bot.api.sendMessage(adminInfoList[i].chatId,
        message('send_day_count_down_success').replace('${count}', userCount + ''), {
          message_thread_id: adminInfoList[i].messageThreadId,
        });
  }
}

function scheduleDailyTask(targetTime: Date, callback: () => MaybePromise<void>): void {
  const now = new Date();
  let timeToWait = targetTime.getTime() - now.getTime();

  if (timeToWait <= 0) {
    // If it's already past target time, schedule it for the next day.
    targetTime.setDate(targetTime.getDate() + 1);
    timeToWait = targetTime.getTime() - now.getTime();
  }

  logger.logProperty?.('scheduleDailyTask', {targetTime, timeToWait: Math.ceil(timeToWait / 60 / 1000) + 'm'});
  setTimeout(async () => {
    targetTime.setDate(targetTime.getDate() + 1);
    scheduleDailyTask(targetTime, callback);
    await callback();
  }, timeToWait);
}

export async function dayCountdown(): Promise<void> {
  const targetTime = new Date();
  targetTime.setHours(config.bot.notifyTimestamp, 0, 0, 0);
  scheduleDailyTask(targetTime, async () => {
    let day = dateDistance(mobaheleh.valueOf());
    if (day < 0) return; // TODO: notify to admin for remove it.

    await sendDayCountdownContent(day);
    for (let i = adminInfoList.length - 1; 0 <= i; i--) {
      await sendContent(--day, adminInfoList[i].chatId, adminInfoList[i].messageThreadId);
    }
  });
}
