import {bot} from './bot.js';
import {logger} from '../config.js';
import {message} from '../director/l18e-loader.js';
import {adminInfoList} from '../util/admin.js';

export async function launchBot(): Promise<void> {
  logger.logMethod?.('launchBot');
  try {
    bot.setWebhook();

    const botInfo = await bot.api.getMe();
    if (botInfo == null) throw new Error('authentication_failed');
    logger.logProperty?.('botInfo', botInfo);

    if (process.env.NODE_ENV === 'production') {
      adminInfoList.forEach(async (info) => {
        await bot.api.sendMessage(info.chatId, message('startup_message'));
      });
    }
  }
  catch (err) {
    logger.error('launchBot', 'launch_bot_failed', err);
  }
}
