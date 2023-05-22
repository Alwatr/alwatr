import {config, logger} from './config.js';
import {message} from './director/l18e-loader.js';
import {bot} from './lib/bot.js';
import {chatStorageClient, contentStorageClient} from './lib/storage.js';
import {adminInfoList} from './util/admin.js';
import {dateDistance, ghadir} from './util/calender.js';
import {actionAllChat} from './util/chat.js';

import type {MaybePromise} from '@alwatr/type';

async function sendNextDayCountdownContent(day: number): Promise<void> {
  day += 1;
  const content = await contentStorageClient.get(day + '', 'ghadir');
  if (content == null) {
    logger.accident('nextDayCountdown', 'content_is_null', 'Next day content is null', day);
    adminInfoList.forEach(async (info) => {
      await bot.api.sendMessage(info.chatId, message('send_next_content_null_message').replace('${day}', day + ''), {
        message_thread_id: info.chatThreadId,
      });
    });

    return;
  }

  for (let i = 0; i < adminInfoList.length; i++) {
    const chatId = adminInfoList[i].chatId;
    const chatThreadId = adminInfoList[i].chatThreadId;
    try {
      const response = await bot.api.copyMessage({
        chat_id: chatId,
        from_chat_id: content.chatId,
        message_id: content.messageId,
        message_thread_id: chatThreadId,
      });

      await bot.api.sendMessage(chatId, message('send_next_day_countdown_day').replace('${day}', day + ''), {
        reply_to_message_id: response?.message_id,
        allow_sending_without_reply: true,
        message_thread_id: chatThreadId,
      });
    }
    catch {
      logger.error('nextDayCountdown', 'copy_message_error', 'Copy Message Error', day, adminInfoList[i]);
      await bot.api.sendMessage(chatId, message('send_next_day_countdown_error'), {
        message_thread_id: chatThreadId,
      });
    }
  }
}

async function sendDayCountdownContent(day: number): Promise<void> {
  const content = await contentStorageClient.get(day + '', 'ghadir');
  if (content == null) {
    logger.accident('dayCountdown', 'content_is_null', 'Content is Null', day);
    adminInfoList.forEach(async (info) => {
      await bot.api.sendMessage(info.chatId, message('send_get_content_null_message').replace('${day}', day + ''), {
        message_thread_id: info.chatThreadId,
      });
    });

    return;
  }
  await actionAllChat(async (chatId) => {
    try {
      const chat = await chatStorageClient.get(chatId)!;
      if (!(chat?.isSubscribed === true)) return;

      await bot.api.copyMessage({
        chat_id: chatId,
        from_chat_id: content.chatId,
        message_id: content.messageId,
      });
    }
    catch {
      logger.accident('dayCountdown', 'copy_message_error', 'Copy Message Error', day, chatId);
    }
  });
}

function scheduleDailyTask(targetTime: Date, callback: () => MaybePromise<void>): void {
  const now = new Date();

  let timeToWait = targetTime.getTime() - now.getTime();

  if (timeToWait < 0) {
    // If it's already past target time, schedule it for the next day.
    targetTime.setDate(targetTime.getDate() + 1);
    timeToWait = targetTime.getTime() - now.getTime();
  }

  setTimeout(async () => {
    scheduleDailyTask(targetTime, callback);
    await callback();
  }, timeToWait);
}

export async function dayCountdown(): Promise<void> {
  const targetTime = new Date();
  targetTime.setHours(config.bot.notifyTimestamp, 0, 0, 0);
  scheduleDailyTask(targetTime, async () => {
    const day = dateDistance(ghadir.valueOf());

    // TODO: remove day countdown
    if (day < 1) return;

    await sendDayCountdownContent(day);
    await sendNextDayCountdownContent(day);
  });
}

bot.defineCommandHandler('dayCountdown', async () => {
  const day = dateDistance(ghadir.valueOf());
  await sendDayCountdownContent(day);
  await sendNextDayCountdownContent(day);
});
