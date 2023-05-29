
import {sendContent} from './bot/command/getContent.js';
import {config, logger} from './config.js';
import {message} from './director/l18e-loader.js';
import {bot} from './lib/bot.js';
import {contentStorageClient} from './lib/storage.js';
import {adminInfoList} from './util/admin.js';
import {dateDistance, ghadir} from './util/calender.js';
import {actionAllChat} from './util/chat.js';

import type {MaybePromise} from '@alwatr/type';

async function sendDayCountdownContent(day: number): Promise<void> {
  logger.logMethodArgs?.('sendDayCountdownContent', {day});
  const content = await contentStorageClient.get(day + '', 'ghadir');
  if (content == null) {
    logger.accident('dayCountdown', 'content_is_null', 'Content is Null', day);
    adminInfoList.forEach(async (info) => {
      await bot.api.sendMessage(info.chatId, message('send_get_content_null_message').replace('${day}', day + ''), {
        message_thread_id: info.messageThreadId,
      });
    });

    return;
  }

  await actionAllChat(async (chat) => {
    try {
      if (!(chat?.isSubscribed === true)) return;

      await bot.api.copyMessage({
        chat_id: chat.id,
        from_chat_id: content.chatId,
        message_id: content.messageId,
        message_thread_id: chat.chatDetail!.messageThreadId as number | undefined,
      });
    }
    catch {
      logger.accident('dayCountdown', 'copy_message_error', 'Copy Message Error', day, chat.id);
    }
  });
}

function scheduleDailyTask(targetTime: Date, callback: () => MaybePromise<void>): void {
  const now = new Date();

  let timeToWait = targetTime.getTime() - now.getTime();

  if (timeToWait <= 0) {
    // If it's already past target time, schedule it for the next day.
    targetTime.setDate(targetTime.getDate() + 1);
    timeToWait = targetTime.getTime() - now.getTime();
  }

  logger.logProperty?.('scheduleDailyTask', {targetTime, timeToWait: (timeToWait / 60 / 1000) + 'm'});
  setTimeout(async () => {
    scheduleDailyTask(targetTime, callback);
    await callback();
  }, timeToWait);
}

export async function dayCountdown(): Promise<void> {
  const targetTime = new Date();
  targetTime.setHours(config.bot.notifyTimestamp, 0, 0, 0);
  targetTime.setHours(9, 0, 0, 0);
  scheduleDailyTask(targetTime, async () => {
    let day = dateDistance(ghadir.valueOf());
    if (day < 1) return; // TODO: notify to admin for remove it.

    await sendDayCountdownContent(day);
    adminInfoList.forEach(async (info) => {
      await sendContent(--day, info.chatId, info.messageThreadId);
    });
  });
}
