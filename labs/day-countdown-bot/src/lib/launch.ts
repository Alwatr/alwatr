import {bot} from './bot.js';
import {config, logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {adminInfoList} from '../util/admin.js';

export async function launchBot(): Promise<void> {
  logger.logMethod?.('launchBot');
  try {
    bot.setWebhook(config.telegram.host, config.telegram.port);

    const botInfo = await bot.api.getMe();
    if (botInfo == null) throw new Error('authentication_failed');
    logger.logProperty?.('botInfo', botInfo);

    if (process.env.NODE_ENV === 'production') {
      for (let i = adminInfoList.length - 1; 0 <= i; i--) {
        await bot.api.sendMessage(adminInfoList[i].chatId, message('startup_message'), {
          message_thread_id: adminInfoList[i].messageThreadId,
        });
      }
    }
  }
  catch (err) {
    logger.error('launchBot', 'launch_bot_failed', err);
  }
}
